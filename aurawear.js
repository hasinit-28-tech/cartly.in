/* =========================================================
   CARTLY.IN — AURAWEAR JS
========================================================= */


/* =========================================================
   USER PROFILE
========================================================= */

const auraProfile = {

    gender: "",
    height: "",
    bodyShape: "",
    fitness: "",
    vibe: "",
    fit: "",
    priority: ""

};


/* =========================================================
   CURRENT STEP
========================================================= */

let currentStep = 1;

const totalSteps = 7;


/* =========================================================
   ELEMENTS
========================================================= */

const intro =
    document.getElementById("intro");

const questionnaire =
    document.getElementById("questionnaire");

const startStyleBtn =
    document.getElementById("startStyleBtn");

const createAuraBtn =
    document.getElementById("createAuraBtn");

const auraResult =
    document.getElementById("auraResult");

const darkModeBtn =
    document.getElementById("darkModeBtn");

const progressFill =
    document.getElementById("progressFill");

const stepText =
    document.getElementById("stepText");

const progressPercent =
    document.getElementById("progressPercent");


/* =========================================================
   START AURAWEAR
========================================================= */

startStyleBtn.addEventListener("click", function () {

    intro.style.display = "none";

    questionnaire.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateProgress();

});


/* =========================================================
   OPTION SELECTION
========================================================= */

const options =
    document.querySelectorAll(".option");

options.forEach(function (option) {

    option.addEventListener("click", function () {

        const question =
            option.dataset.question;

        const value =
            option.dataset.value;


        if (!question || !value) {
            return;
        }


        /* remove selection from same question */

        document
            .querySelectorAll(
                `.option[data-question="${question}"]`
            )
            .forEach(function (item) {

                item.classList.remove("selected");

            });


        /* select clicked option */

        option.classList.add("selected");


        /* save answer */

        auraProfile[question] = value;


        /*
           Gender/body/vibe etc.
           automatically move forward.
        */

        if (question !== "priority") {

            setTimeout(function () {

                goToNextStep();

            }, 250);

        }

    });

});


/* =========================================================
   HEIGHT
========================================================= */

const heightInput =
    document.getElementById("height");


/* =========================================================
   CONTINUE BUTTON
========================================================= */

const continueBtn =
    document.querySelector(".continue-btn");

if (continueBtn) {

    continueBtn.addEventListener("click", function () {

        const height =
            heightInput.value.trim();


        if (!height) {

            alert(
                "📏 Tell me your height first bestie!"
            );

            heightInput.focus();

            return;
        }


        const numericHeight =
            Number(height);


        if (
            numericHeight < 100 ||
            numericHeight > 230
        ) {

            alert(
                "Hmm 😭 enter a height between 100 and 230 cm."
            );

            return;
        }


        auraProfile.height =
            numericHeight + " cm";


        goToNextStep();

    });

}


/* =========================================================
   NEXT STEP
========================================================= */

function goToNextStep() {

    if (currentStep >= totalSteps) {

        showFinalButton();

        return;
    }


    currentStep++;


    showStep(currentStep);

    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW STEP
========================================================= */

function showStep(stepNumber) {

    const steps =
        document.querySelectorAll(
            ".question-step"
        );


    steps.forEach(function (step) {

        step.classList.remove("active");

    });


    const selectedStep =
        document.querySelector(
            `.question-step[data-step="${stepNumber}"]`
        );


    if (selectedStep) {

        selectedStep.classList.add("active");

    }


    if (stepNumber === totalSteps) {

        /*
           Last question visible.
           Final button appears after selection.
        */

        document
            .querySelector(".final-action")
            .classList.remove("show");

    }

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const percentage =
        Math.round(
            (currentStep / totalSteps) * 100
        );


    progressFill.style.width =
        percentage + "%";


    progressPercent.textContent =
        percentage + "%";


    stepText.textContent =
        `Step ${currentStep} of ${totalSteps}`;

}


/* =========================================================
   LAST OPTION
========================================================= */

const priorityOptions =
    document.querySelectorAll(
        '[data-question="priority"]'
    );


priorityOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        auraProfile.priority =
            option.dataset.value;


        document
            .querySelector(".final-action")
            .classList.add("show");

    });

});


/* =========================================================
   CREATE AURA
========================================================= */

createAuraBtn.addEventListener(
    "click",
    function () {

        createAura();

    }
);


/* =========================================================
   CREATE PERSONAL STYLE
========================================================= */

function createAura() {

    /*
       Make sure everything exists
    */

    if (!auraProfile.gender) {

        alert(
            "👀 Pick your styling preference first!"
        );

        return;
    }


    if (!auraProfile.height) {

        alert(
            "📏 We still need your height!"
        );

        return;
    }


    if (!auraProfile.bodyShape) {

        alert(
            "🧍 Pick your build!"
        );

        return;
    }


    if (!auraProfile.fitness) {

        alert(
            "🏋️ Tell us your everyday vibe!"
        );

        return;
    }


    if (!auraProfile.vibe) {

        alert(
            "✨ Choose your vibe!"
        );

        return;
    }


    if (!auraProfile.fit) {

        alert(
            "👕 Pick your preferred fit!"
        );

        return;
    }


    if (!auraProfile.priority) {

        alert(
            "☁️ One last thing — choose what matters most!"
        );

        return;
    }


    /*
       Put profile into result
    */

    document.getElementById(
        "resultGender"
    ).textContent =
        auraProfile.gender;


    document.getElementById(
        "resultHeight"
    ).textContent =
        auraProfile.height;


    document.getElementById(
        "resultBody"
    ).textContent =
        auraProfile.bodyShape;


    document.getElementById(
        "resultFitness"
    ).textContent =
        auraProfile.fitness;


    document.getElementById(
        "resultVibe"
    ).textContent =
        auraProfile.vibe;


    document.getElementById(
        "resultFit"
    ).textContent =
        auraProfile.fit;


    /*
       Generate personalised summary
    */

    generateStyleSummary();


    /*
       Hide questionnaire
    */

    questionnaire.classList.remove(
        "active"
    );


    /*
       Show result
    */

    auraResult.classList.add(
        "active"
    );


    /*
       Save profile
       so other Cartly pages can use it later.
    */

    localStorage.setItem(
        "auraWearProfile",
        JSON.stringify(auraProfile)
    );


    /*
       Scroll to result
    */

    setTimeout(function () {

        auraResult.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);

}


/* =========================================================
   PERSONAL STYLE SUMMARY
========================================================= */

function generateStyleSummary() {

    const title =
        document.getElementById(
            "summaryTitle"
        );

    const text =
        document.getElementById(
            "summaryText"
        );


    let styleTitle =
        "Your Personal Style Era";

    let styleDescription =
        "AuraWear is ready to curate looks around your preferences.";


    /*
       VIBE BASED PERSONALISATION
    */

    switch (auraProfile.vibe) {

        case "Street":

            styleTitle =
                "Your Streetwear Era 🖤";

            styleDescription =
                "AuraWear is building effortless streetwear looks around your vibe, preferred fit and lifestyle. Expect cool layers, relaxed silhouettes and pieces that feel easy to wear.";

            break;


        case "Minimal":

            styleTitle =
                "Your Minimal Era 🤍";

            styleDescription =
                "Clean lines, neutral tones and simple silhouettes are your thing. AuraWear will focus on polished pieces that look effortless.";

            break;


        case "Classic":

            styleTitle =
                "Your Classic Era 🤎";

            styleDescription =
                "Timeless, polished and effortlessly put together. Your recommendations will focus on versatile pieces that never really go out of style.";

            break;


        case "Trendy":

            styleTitle =
                "Your Trend Era 🔥";

            styleDescription =
                "You like staying ahead of the curve. AuraWear will mix current fashion energy with pieces that still feel like you.";

            break;


        case "Casual":

            styleTitle =
                "Your Everyday Era 🌿";

            styleDescription =
                "Comfort meets style. Your AuraWear looks will focus on relaxed, wearable pieces that work for everyday life.";

            break;


        case "Old Money":

            styleTitle =
                "Your Quiet Luxury Era 💼";

            styleDescription =
                "Refined, timeless and understated. Expect elegant silhouettes, sophisticated combinations and elevated basics.";

            break;


        case "Edgy":

            styleTitle =
                "Your Edgy Era ⚡";

            styleDescription =
                "Bold pieces, darker energy and statement styling are your lane. AuraWear will keep your recommendations expressive.";

            break;


        case "Surprise":

            styleTitle =
                "Your Anything-Goes Era ✨";

            styleDescription =
                "You're trusting AuraWear to cook. We'll mix your proportions, lifestyle and preferences to find looks that simply work.";

            break;

    }


    title.textContent =
        styleTitle;

    text.textContent =
        styleDescription;

}


/* =========================================================
   EXPLORE MY LOOKS
========================================================= */

const exploreLooksBtn =
    document.getElementById(
        "exploreLooksBtn"
    );


exploreLooksBtn.addEventListener(
    "click",
    function () {

        /*
           For now send user to the
           main shopping/index page.

           Later we can connect this
           to a dedicated AuraWear
           recommendation page.
        */

        window.location.href =
            "index.html";

    }
);


/* =========================================================
   DARK MODE
========================================================= */

darkModeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        darkModeBtn.textContent =
            isDark ? "☀️" : "🌙";


        localStorage.setItem(
            "cartlyDarkMode",
            isDark ? "true" : "false"
        );

    }
);


/* =========================================================
   LOAD DARK MODE
========================================================= */

const savedDarkMode =
    localStorage.getItem(
        "cartlyDarkMode"
    );


if (savedDarkMode === "true") {

    document.body.classList.add(
        "dark-mode"
    );

    darkModeBtn.textContent =
        "☀️";

}


/* =========================================================
   LOAD PREVIOUS AURA PROFILE
========================================================= */

const savedAuraProfile =
    localStorage.getItem(
        "auraWearProfile"
    );


if (savedAuraProfile) {

    try {

        const previousProfile =
            JSON.parse(
                savedAuraProfile
            );


        /*
           Keep previous profile available,
           but don't automatically skip
           the questionnaire.
        */

        console.log(
            "Previous AuraWear profile:",
            previousProfile
        );

    } catch (error) {

        console.log(
            "No previous AuraWear profile loaded."
        );

    }

}


/* =========================================================
   INITIAL PROGRESS
========================================================= */

updateProgress();