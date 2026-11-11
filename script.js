
// Get HTML elements
const scoreDisplay = document.getElementById("score");
const spinBtn = document.getElementById("spinBtn");
const message = document.getElementById("message");

const slots = [
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3")
];

// Available emojis
const emojis = ["🍒", "🍋", "🍇", "💎", "⭐", "🔔"];

// Starting score
let score = 100;

// Spin cost
const spinCost = 10;

// Jackpot reward
const jackpot = 100;

// Spin button click event
spinBtn.addEventListener("click", function () {

    // Check if player has enough points
    if (score < 10) {
        message.textContent = "Game Over! Not enough points.";
        spinBtn.disabled = true;
        return;
    }

    // Disable button immediately
    spinBtn.disabled = true;

    // Deduct spin cost
    score -= spinCost;
    scoreDisplay.textContent = score;

    message.textContent = "Spinning... Good luck!";

    // Add rolling animation
    slots.forEach(function (slot) {
        slot.classList.add("rolling");
    });

    // Start rolling emojis
    const spinInterval = setInterval(function () {

        slots.forEach(function (slot) {

            const randomIndex = Math.floor(
                Math.random() * emojis.length
            );

            slot.textContent = emojis[randomIndex];

        });

    }, 100);

    // Stop rolling after 2 seconds
    setTimeout(function () {

        // Stop interval
        clearInterval(spinInterval);

        // Remove rolling animation
        slots.forEach(function (slot) {
            slot.classList.remove("rolling");
        });

        // Generate final random emojis
        const results = slots.map(function (slot) {

            const randomIndex = Math.floor(
                Math.random() * emojis.length
            );

            const result = emojis[randomIndex];

            slot.textContent = result;

            return result;

        });

        // Check if all three emojis match
        if (
            results[0] === results[1] &&
            results[1] === results[2]
        ) {

            // Jackpot reward
            score += jackpot;

            message.textContent =
                "🎉 JACKPOT! YOU WON 100 POINTS! 🎉";

        } else {

            message.textContent =
                "No match! Try again!";

        }

        // Update score display
        scoreDisplay.textContent = score;

        // Disable button if score falls below 10
        if (score < 10) {

            spinBtn.disabled = true;

            message.textContent =
                "GAME OVER! Your score is below 10.";

        } else {

            // Allow another spin
            spinBtn.disabled = false;

        }

    }, 2000);

});
