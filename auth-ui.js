import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const OWNER_EMAIL = "denizzzezw@gmail.com";


function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function createAuthUI(user) {

    const authArea = document.getElementById("authArea");

    if (!authArea) {
        return;
    }


    if (!user) {

        authArea.innerHTML = `
            <a href="./login.html" class="nav-login">
                Login
            </a>
        `;

        return;
    }


    const isOwner =
        String(user.email || "").toLowerCase() ===
        OWNER_EMAIL.toLowerCase();


    const displayName =
        user.displayName ||
        user.email?.split("@")[0] ||
        "Account";


    authArea.innerHTML = `

        <div class="account-wrapper">

            ${
                isOwner
                    ? `
                        <a
                            href="./admin.html"
                            class="admin-button"
                        >
                            Admin Panel
                        </a>
                    `
                    : ""
            }

            <button
                id="accountButton"
                class="account-button"
                type="button"
            >

                <span class="account-avatar">
                    ${escapeHtml(displayName.charAt(0).toUpperCase())}
                </span>

                <span class="account-name">
                    ${escapeHtml(displayName)}
                </span>

                <span class="account-arrow">
                    ▾
                </span>

            </button>


            <div
                id="accountDropdown"
                class="account-dropdown"
            >

                <div class="dropdown-email">
                    ${escapeHtml(user.email)}
                </div>

                <a href="./profile.html">
                    Profile
                </a>

                ${
                    isOwner
                        ? `
                            <a href="./admin.html">
                                Admin Panel
                            </a>
                        `
                        : ""
                }

                <button
                    id="logoutButton"
                    type="button"
                >
                    Logout
                </button>

            </div>

        </div>
    `;


    const accountButton =
        document.getElementById("accountButton");

    const dropdown =
        document.getElementById("accountDropdown");

    const logoutButton =
        document.getElementById("logoutButton");


    accountButton?.addEventListener(
        "click",
        () => {

            dropdown?.classList.toggle("show");

        }
    );


    logoutButton?.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                window.location.href =
                    "./index.html";

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".account-wrapper"
                )
            ) {

                dropdown?.classList.remove("show");

            }

        }
    );

}


onAuthStateChanged(
    auth,
    user => {

        createAuthUI(user);

    }
);
