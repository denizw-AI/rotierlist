import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { auth } from "./firebase.js";

const loginLink = document.querySelector('a[href="login.html"]');
const registerLink = document.querySelector('a[href="register.html"]');

function createAccountUI(user) {
    if (!loginLink && !registerLink) return;

    if (loginLink) loginLink.remove();
    if (registerLink) registerLink.remove();

    const wrapper = document.createElement("div");

    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const button = document.createElement("button");

    button.textContent = `👤 ${user.displayName || user.email.split("@")[0]} ▾`;

    button.style.background = "#18181d";
    button.style.border = "1px solid #303038";
    button.style.color = "white";
    button.style.padding = "9px 14px";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.fontSize = "14px";
    button.style.fontWeight = "700";

    const menu = document.createElement("div");

    menu.style.display = "none";
    menu.style.position = "absolute";
    menu.style.right = "0";
    menu.style.top = "46px";
    menu.style.width = "190px";
    menu.style.background = "#111114";
    menu.style.border = "1px solid #2c2c33";
    menu.style.borderRadius = "10px";
    menu.style.padding = "6px";
    menu.style.zIndex = "9999";
    menu.style.boxShadow = "0 15px 40px rgba(0,0,0,.45)";

    function addMenuItem(text, href) {
        const item = document.createElement("a");

        item.textContent = text;
        item.href = href;

        item.style.display = "block";
        item.style.padding = "11px 12px";
        item.style.color = "#d4d4d8";
        item.style.textDecoration = "none";
        item.style.borderRadius = "7px";
        item.style.fontSize = "14px";

        item.addEventListener("mouseenter", () => {
            item.style.background = "#1d1d23";
            item.style.color = "white";
        });

        item.addEventListener("mouseleave", () => {
            item.style.background = "transparent";
            item.style.color = "#d4d4d8";
        });

        menu.appendChild(item);
    }

    addMenuItem("👤 My Profile", "profile.html");

    addMenuItem("⚙ Settings", "settings.html");

    const separator = document.createElement("div");

    separator.style.height = "1px";
    separator.style.background = "#2a2a30";
    separator.style.margin = "5px 0";

    menu.appendChild(separator);

    const logout = document.createElement("button");

    logout.textContent = "↪ Logout";

    logout.style.width = "100%";
    logout.style.border = "none";
    logout.style.background = "transparent";
    logout.style.color = "#f87171";
    logout.style.padding = "11px 12px";
    logout.style.textAlign = "left";
    logout.style.borderRadius = "7px";
    logout.style.cursor = "pointer";
    logout.style.fontSize = "14px";
    logout.style.fontWeight = "700";

    logout.addEventListener("mouseenter", () => {
        logout.style.background = "#211518";
    });

    logout.addEventListener("mouseleave", () => {
        logout.style.background = "transparent";
    });

    logout.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
        }
    });

    menu.appendChild(logout);

    button.addEventListener("click", (event) => {
        event.stopPropagation();

        menu.style.display =
            menu.style.display === "none" ? "block" : "none";
    });

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });

    wrapper.appendChild(button);
    wrapper.appendChild(menu);

    const navLinks = document.querySelector(".nav-links");

    if (navLinks) {
        navLinks.appendChild(wrapper);
    }
}

function createLoginUI() {
    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) return;

    if (!document.querySelector('a[href="login.html"]')) {
        const login = document.createElement("a");

        login.href = "login.html";
        login.textContent = "Login";

        navLinks.appendChild(login);
    }

    if (!document.querySelector('a[href="register.html"]')) {
        const register = document.createElement("a");

        register.href = "register.html";
        register.textContent = "Register";

        navLinks.appendChild(register);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        createAccountUI(user);
    } else {
        createLoginUI();
    }
});
