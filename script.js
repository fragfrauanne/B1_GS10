const tasks = [
    { question: "ein Vogel, der singt", answer: "ein singender Vogel" },
    { question: "ein Baby, das weint", answer: "ein weinendes Baby" },
    { question: "Wasser, das kocht", answer: "kochendes Wasser" },
    { question: "Preise, die steigen", answer: "steigende Preise" },
    { question: "ein Kind, das schläft", answer: "ein schlafendes Kind" },
    { question: "eine Bluse, die passt", answer: "eine passende Bluse" },
    { question: "ein Auto, das fährt", answer: "ein fahrendes Auto" },
    { question: "Temperaturen, die steigen", answer: "steigende Temperaturen" },
    { question: "eine Arbeit, die anstrengt", answer: "eine anstrengende Arbeit" },
    { question: "die Woche, die kommt", answer: "die kommende Woche" },
    { question: "Fragen, die folgen", answer: "folgende Fragen" },
    { question: "ein Junge, der lacht", answer: "ein lachender Junge" },
    { question: "ein Papagei, der spricht", answer: "ein sprechender Papagei" },
    { question: "eine Nachricht, die schockiert", answer: "eine schockierende Nachricht" },
    { question: "die Sonne, die untergeht", answer: "eine untergehende Sonne" },
    { question: "ein Film, der aufregt", answer: "ein aufregender Film" },
    { question: "ein Besuch, der überrascht", answer: "ein überraschender Besuch" },
    { question: "die Worte, die fehlen", answer: "die fehlenden Worte" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);