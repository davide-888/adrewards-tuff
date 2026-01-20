/* ============================================================
   AD REWARDS – SCRIPT PRINCIPALE
   ============================================================ */

// ----------------------
// DATA SAVE
// ----------------------
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


// ----------------------
// GUARDA AD (Monetag)
// ----------------------
function watchAd() {
    show_10490467().then(() => {

        // Reward casuale tra 0.1 e 1
        let reward = (Math.random() * (1 - 0.1) + 0.1).toFixed(2);

        let current = loadCoinz();
        let updated = (current + parseFloat(reward)).toFixed(2);

        saveCoinz(updated);
        updateCoinzUI();

        alert("Hai guadagnato " + reward + " COINZ!");

        // Backend Monetag (se lo userai)
        fetch("https://TUO-SERVER.COM/monetag-callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                event: "rewarded",
                reward: reward,
                total: updated
            })
        }).catch(() => {});
    });
}


// ----------------------
// RICHIESTA ROBUX
// ----------------------
function withdraw(robux, cost, gamepassPrice) {

    let coinz = loadCoinz();

    if (coinz < cost) {
        alert("Non hai abbastanza COINZ!");
        return;
    }

    let username = prompt("Inserisci il tuo username Roblox:");
    if (!username) return;

    alert(
        "ATTENZIONE!\n" +
        "• Devi creare un Gamepass da " + gamepassPrice + " Robux.\n" +
        "• La tua place deve essere PUBBLICA.\n" +
        "• Se sbagli o non troviamo il gamepass NON facciamo rimborsi.\n" +
        "• I pagamenti richiedono 1-3 giorni perché vengono elaborati manualmente."
    );

    let profileLink = "https://www.roblox.com/users/profile?username=" + username;

    // INVIO ALLA WEBHOOK DISCORD
    fetch("https://discord.com/api/webhooks/1463096692974026918/YeSO3QIdQO4Nb85HtA06eu33J_CgB2KcZJTH6MR5jb_woNwdTf2_HhdjTnOlDZKCNJPV", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content:
                "**Nuova richiesta Robux**\n" +
                "👤 Username: " + username + "\n" +
                "🔗 Profilo: " + profileLink + "\n" +
                "💸 Robux richiesti: " + robux + "\n" +
                "⏳ Tempo stimato: 1-3 giorni"
        })
    });

    alert("Richiesta inviata! Il pagamento verrà elaborato entro 1-3 giorni.");
}
