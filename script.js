/* ============================================================
   AD REWARDS – UI SCRIPT (NUOVA INTERFACCIA)
   ============================================================ */

/* -----------------------------
   COINZ (LOGICA ORIGINALE)
------------------------------ */
function loadCoinz() {
    return parseFloat(localStorage.getItem("coinz") || "0");
}

function saveCoinz(amount) {
    localStorage.setItem("coinz", amount);
}

function updateCoinzUI() {
    document.querySelectorAll("#coinz").forEach(el => {
        el.textContent = loadCoinz();
    });
}

updateCoinzUI();

/* -----------------------------
   WATCH AD (LOGICA ORIGINALE)
------------------------------ */
function watchAd() {
    show_10490467().then(() => {

        let reward = (Math.random() * (1 - 0.1) + 0.1).toFixed(2);

        let current = loadCoinz();
        let updated = (current + parseFloat(reward)).toFixed(2);

        saveCoinz(updated);
        updateCoinzUI();

        alert("You earned " + reward + " COINZ!");

        // opzionale: invio al backend
        fetch("https://adrewards-backend.onrender.com/reward", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                telegram_id: "local-user",
                reward: parseFloat(reward)
            })
        }).catch(() => {});
    });
}

/* -----------------------------
   PAGAMENTI (LOGICA ORIGINALE)
------------------------------ */
function withdraw(robux, cost, gamepassPrice) {

    let coinz = loadCoinz();

    if (coinz < cost) {
        alert("You don't have enough COINZ!");
        return;
    }

    let username = prompt("Enter your Roblox username:");
    if (!username) return;

    alert(
        "IMPORTANT:\n" +
        "• Your Roblox place must be PUBLIC.\n" +
        "• Create a Gamepass costing " + gamepassPrice + " Robux.\n" +
        "• If the Gamepass or username is wrong, the payment may fail.\n" +
        "• Payments take 1–3 days (manual processing)."
    );

    let profileLink = "https://www.roblox.com/users/profile?username=" + username;

    fetch("https://discord.com/api/webhooks/1463096692974026918/YeSO3QIdQO4Nb85HtA06eu33J_CgB2KcZJTH6MR5jb_woNwdTf2_HhdjTnOlDZKCNJPV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content:
                "**New Robux Withdrawal Request**\n" +
                "👤 Username: " + username + "\n" +
                "🔗 Profile: " + profileLink + "\n" +
                "💸 Robux requested: " + robux + "\n" +
                "⏳ Estimated time: 1–3 days"
        })
    });

    alert("Your request has been sent!");
}

/* ============================================================
   NUOVA INTERFACCIA – NAVIGAZIONE
============================================================ */
function switchScreen(target) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

    document.getElementById("screen-" + target).classList.add("active");

    const map = { home: 0, leaderboard: 1, payment: 2 };
    document.querySelectorAll(".nav-btn")[map[target]].classList.add("active");
}

/* ============================================================
   LEADERBOARD – DAILY / ALL‑TIME
============================================================ */
function showLeaderboard(type) {
    const dailyList = document.getElementById("leaderboard-daily");
    const allList = document.getElementById("leaderboard-alltime");
    const tabDaily = document.getElementById("tab-daily");
    const tabAll = document.getElementById("tab-alltime");

    if (type === "daily") {
        dailyList.classList.remove("hidden");
        allList.classList.add("hidden");
        tabDaily.classList.add("active");
        tabAll.classList.remove("active");
    } else {
        dailyList.classList.add("hidden");
        allList.classList.remove("hidden");
        tabDaily.classList.remove("active");
        tabAll.classList.add("active");
    }
}

/* ============================================================
   PAYMENT – APERTURA PANNELLO ROBLOX
============================================================ */
function openRobloxPayments() {
    document.getElementById("roblox-payments").classList.toggle("hidden");
}

/* ============================================================
   TIMER DAILY RESET (FRONTEND)
============================================================ */
function startDailyTimer() {
    let remaining = 24 * 60 * 60; // 24 ore

    function tick() {
        const h = String(Math.floor(remaining / 3600)).padStart(2, "0");
        const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
        const s = String(remaining % 60).padStart(2, "0");

        document.getElementById("daily-timer").textContent = `${h}:${m}:${s}`;

        if (remaining > 0) {
            remaining--;
            setTimeout(tick, 1000);
        } else {
            // qui potresti ricaricare la daily leaderboard dal backend
        }
    }

    tick();
}

startDailyTimer();
