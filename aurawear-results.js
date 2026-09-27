/* =========================================
   AURAWEAR RESULTS
========================================= */


/* GET USER PROFILE */

const profile = JSON.parse(
    localStorage.getItem("auraWearProfile")
) || {};


/* GET ELEMENTS */

const genderEl = document.getElementById("resultGender");
const heightEl = document.getElementById("resultHeight");
const bodyEl = document.getElementById("resultBody");
const fitnessEl = document.getElementById("resultFitness");
const vibeEl = document.getElementById("resultVibe");
const fitEl = document.getElementById("resultFit");

const styleTitle = document.getElementById("styleTitle");
const styleDescription = document.getElementById("styleDescription");
const styleBadge = document.getElementById("styleBadge");

const looksGrid = document.getElementById("looksGrid");


/* =========================================
   DISPLAY PROFILE
========================================= */

genderEl.textContent = profile.gender || "Not specified";

heightEl.textContent =
    profile.height
        ? `${profile.height} cm`
        : "Not specified";

bodyEl.textContent =
    profile.bodyShape || "Not specified";

fitnessEl.textContent =
    profile.fitness || "Not specified";

vibeEl.textContent =
    profile.vibe || "Not specified";

fitEl.textContent =
    profile.fit || "Depends";


/* =========================================
   STYLE LOGIC
========================================= */

const vibe = (profile.vibe || "").toLowerCase();

const gender = (profile.gender || "").toLowerCase();

const bodyShape = (profile.bodyShape || "").toLowerCase();

const fitness = (profile.fitness || "").toLowerCase();

let styleName = "Your Personal Style";
let styleText = "A curated mix based on your preferences.";
let badgeText = "✨ Personalised For You";


/* STREET */

if (vibe.includes("street")) {

    styleName = "Your Streetwear Era 🖤";

    styleText =
        "Relaxed silhouettes, statement pieces and effortless street energy — built around your vibe.";

    badgeText = "🔥 Streetwear";

}


/* MINIMAL */

else if (vibe.includes("minimal")) {

    styleName = "Your Minimal Era 🤍";

    styleText =
        "Clean silhouettes, neutral tones and simple pieces that make your style look effortlessly put together.";

    badgeText = "🤍 Minimal";


}


/* CLASSIC */

else if (vibe.includes("classic")) {

    styleName = "Your Classic Era ✨";

    styleText =
        "Timeless pieces, polished fits and elegant combinations that never go out of style.";

    badgeText = "✨ Classic";


}


/* TRENDY */

else if (vibe.includes("trendy")) {

    styleName = "Your Trend Era 💅";

    styleText =
        "Fresh silhouettes, statement pieces and current trends made to match your personality.";

    badgeText = "💫 Trendy";

}


/* UPDATE */

styleTitle.textContent = styleName;

styleDescription.textContent = styleText;

styleBadge.textContent = badgeText;


/* =========================================
   PRODUCT DATABASE
========================================= */

const looks = [

    {
        name: "Everyday Street Fit",
        category: "Streetwear",
        emoji: "🖤",
        description:
            "Oversized top, relaxed bottoms and clean sneakers for an effortless everyday look.",
        tags: ["street", "guy", "girl", "unisex"]
    },

    {
        name: "Clean Minimal Fit",
        category: "Minimal",
        emoji: "🤍",
        description:
            "Neutral colours, structured layers and simple accessories for a clean aesthetic.",
        tags: ["minimal", "guy", "girl", "unisex"]
    },

    {
        name: "Classic Smart Look",
        category: "Classic",
        emoji: "🤎",
        description:
            "A polished combination of timeless basics that works for college, work and casual plans.",
        tags: ["classic", "guy", "girl", "unisex"]
    },

    {
        name: "Oversized Casual",
        category: "Casual",
        emoji: "👕",
        description:
            "Relaxed proportions with comfortable basics for an easy everyday outfit.",
        tags: ["street", "casual", "guy", "girl", "unisex"]
    },

    {
        name: "Athleisure Energy",
        category: "Activewear",
        emoji: "🏃",
        description:
            "Sporty layers, comfortable fits and versatile pieces for an active lifestyle.",
        tags: ["gym", "home workouts", "guy", "girl", "unisex"]
    },

    {
        name: "Smart Casual",
        category: "Smart Casual",
        emoji: "✨",
        description:
            "A balanced look combining relaxed comfort with a polished finish.",
        tags: ["classic", "minimal", "guy", "girl", "unisex"]
    }

];


/* =========================================
   CHOOSE RECOMMENDATIONS
========================================= */

function getRecommendations() {

    let selected = [];

    /* Match vibe */

    looks.forEach(item => {

        if (
            vibe &&
            item.tags.some(tag =>
                vibe.includes(tag)
            )
        ) {
            selected.push(item);
        }

    });


    /* Match gender */

    if (gender) {

        selected = selected.filter(item => {

            return (
                item.tags.includes("unisex") ||
                item.tags.includes(gender) ||
                gender.includes(item.tags[0])
            );

        });

    }


    /* If not enough */

    if (selected.length < 3) {

        selected = looks.slice(0, 4);

    }


    return selected.slice(0, 4);

}


/* =========================================
   DISPLAY LOOKS
========================================= */

function displayLooks() {

    const recommendations =
        getRecommendations();

    looksGrid.innerHTML = "";


    recommendations.forEach((look, index) => {

        const card =
            document.createElement("div");

        card.className = "look-card";


        card.innerHTML = `

            <div class="look-image">
                ${look.emoji}
            </div>

            <div class="look-content">

                <div class="tag">
                    ${look.category}
                </div>

                <h3>
                    ${look.name}
                </h3>

                <p>
                    ${look.description}
                </p>

                <a
                    href="index.html"
                    class="shop-btn"
                >
                    🛍️ Shop Similar →
                </a>

            </div>

        `;


        looksGrid.appendChild(card);

    });

}


/* =========================================
   START
========================================= */

displayLooks();