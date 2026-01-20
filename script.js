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

function watchAd() {
    show_10490467().then(() => {

        let reward = (Math.random() * (1 - 0.1) + 0.1).toFixed(2);

        let current = loadCoinz();
        let updated = (current + parseFloat(reward)).toFixed(2);

        saveCoinz(updated);
        updateCoinzUI();

        alert("You earned " + reward + " COINZ!");
    });
}

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
        "• You must create a Gamepass costing " + gamepassPrice + " Robux.\n" +
        "• Your place must be PUBLIC.\n" +
        "• If you make a mistake or we can't find the Gamepass, NO refunds.\n" +
        "• Payments take 1–3 days because we process them manually."
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

    alert("Your request has been sent! Payment will be processed within 1–3 days.");
}
