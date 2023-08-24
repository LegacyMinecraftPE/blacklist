document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("addBanForm");
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const playerName = document.getElementById("playerName").value;
                const banReason = document.getElementById("banReason").value;
                const twinks = document.getElementById("twinks").value;
                const discord = document.getElementById("discord").value;
                const yourDiscord = document.getElementById("your_discord").value;

		const webhookToken = "{{ secrets.WEBHOOKTOKEN }}"; 
        const webhookUrl = `https://discordapp.com/api/webhooks/${webhookToken}`;

                const embedData = {
                    title: "New Ban Request:",
                    color: 0x2196f3,
                    fields: [
                        { name: "Player Name:", value: playerName, inline: false },
                        { name: "Ban Reason:", value: banReason, inline: false },
                        { name: "Twinks:", value: twinks || "Not specified", inline: false },
                        { name: "Discord:", value: discord || "Not specified", inline: false },
                        { name: "Request author's discord:", value: yourDiscord || "Not specified", inline: false },
                    ],
                };

                fetch(webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ embeds: [embedData] }),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    alert("Your ban request has been submitted for review");
                    document.getElementById("playerName").value = "";
                    document.getElementById("banReason").value = "";
                    document.getElementById("twinks").value = "";
                    document.getElementById("discord").value = "";
                    document.getElementById("your_discord").value = "";
                })

                .catch((error) => {
                    console.error("Error sending ban:", error);
                    alert("An error occurred while sending the ban request.");
                });
            });
        });
