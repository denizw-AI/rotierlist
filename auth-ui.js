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

    const authArea =
        document.getElementById("authArea");

    if (!authArea) return;


    /* =========================
       LOGGED OUT
    ========================= */

    if (!user) {

        authArea.innerHTML = `
            <div class="auth-buttons">

                <a
                    href="./login.html"
                    class="nav-login"
                >
                    Login
                </a>

                <a
                    href="./register.html"
                    class="nav-register"
                >
                    Register
                </a>

            </div>
        `;

        return;
    }


    /* =========================
       ACCOUNT
    ========================= */

    const isOwner =
        String(user.email || "").toLowerCase()
        ===
        OWNER_EMAIL.toLowerCase();


    const displayName =
        user.displayName ||
        user.email?.split("@")[0] ||
        "Account";


    const initial =
        displayName
            .charAt(0)
            .toUpperCase();


    authArea.innerHTML = `

        <div class="account-wrapper">

            ${
                isOwner
                    ? `
                        <a
                            href="./admin.html"
                            class="admin-top-button"
                        >
                            <span>✦</span>
                            Admin
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
                    ${escapeHtml(initial)}
                </span>

                <span class="account-name">
                    ${escapeHtml(displayName)}
                </span>

                <span class="account-chevron">
                    ↓
                </span>

            </button>


            <div
                id="accountDropdown"
                class="account-dropdown"
            >

                <div class="account-header">

                    <div class="big-avatar">
                        ${escapeHtml(initial)}
                    </div>

                    <div class="account-details">

                        <div class="account-display-name">
                            ${escapeHtml(displayName)}
                        </div>

                        <div class="account-email">
                            ${escapeHtml(user.email)}
                        </div>

                    </div>

                </div>


                <div class="dropdown-divider"></div>


                <a
                    href="./profile.html"
                    class="dropdown-item"
                >

                    <span class="dropdown-icon">
                        ◉
                    </span>

                    <span>
                        Profile
                    </span>

                </a>


                ${
                    isOwner
                        ? `
                            <a
                                href="./admin.html"
                                class="dropdown-item"
                            >

                                <span class="dropdown-icon">
                                    ✦
                                </span>

                                <span>
                                    Admin Panel
                                </span>

                            </a>
                        `
                        : ""
                }


                <div class="dropdown-divider"></div>


                <button
                    id="logoutButton"
                    class="logout-item"
                    type="button"
                >

                    <span class="dropdown-icon">
                        ↪
                    </span>

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </div>
    `;


    /* =========================
       ELEMENTS
    ========================= */

    const accountButton =
        document.getElementById(
            "accountButton"
        );

    const dropdown =
        document.getElementById(
            "accountDropdown"
        );

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    /* =========================
       DROPDOWN
    ========================= */

    accountButton?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            dropdown?.classList.toggle("show");

            accountButton.classList.toggle(
                "open"
            );

        }
    );


    /* =========================
       LOGOUT
    ========================= */

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


    /* =========================
       CLOSE OUTSIDE
    ========================= */

    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".account-wrapper"
                )
            ) {

                dropdown?.classList.remove(
                    "show"
                );

                accountButton?.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
    auth,
    user => {
        createAuthUI(user);
    }
);
