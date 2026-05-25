let currentGender = "";

// 🔥 Gender Selection

function selectGender(type){

  currentGender = type;

  document.getElementById("genderScreen").style.display =
  "none";

  let hair =
  document.getElementById("hair");

  let body =
  document.getElementById("body");

  let face =
  document.getElementById("face");

  let earrings =
  document.getElementById("earrings");

  // 👧 GIRL

  if(type === "girl"){

    /* Hair */

    hair.style.width = "260px";
    hair.style.height = "210px";

    hair.style.left = "30px";
    hair.style.top = "10px";

    hair.style.borderRadius =
    "140px 140px 100px 100px";

    hair.style.background = "#5c4033";

    /* Body */

    body.style.width = "190px";
    body.style.height = "200px";

    body.style.left = "65px";

    body.style.borderRadius =
    "60px 60px 35px 35px";

    body.style.background = "#ff4d6d";

    /* Face */

    face.style.borderRadius =
    "45% 45% 50% 50%";

    /* Earrings Visible */

    earrings.style.display = "block";

  }

  // 👦 BOY

  else{

    /* Hair */

    hair.style.width = "230px";
    hair.style.height = "90px";

    hair.style.left = "45px";
    hair.style.top = "10px";

    hair.style.borderRadius =
    "50px";

    hair.style.background = "black";

    /* Body */

    body.style.width = "240px";
    body.style.height = "190px";

    body.style.left = "40px";

    body.style.borderRadius =
    "30px";

    body.style.background = "#4d79ff";

    /* Face */

    face.style.borderRadius =
    "35% 35% 45% 45%";

    /* Hide Earrings */

    earrings.style.display = "none";

  }

}

// 🔥 Hairstyles

function changeHair(){

  let hair =
  document.getElementById("hair");

  const girlStyles = [

    {
      width:"260px",
      height:"210px",
      radius:"140px 140px 100px 100px",
      color:"#5c4033",
      top:"10px"
    },

    {
      width:"275px",
      height:"220px",
      radius:"50% 50% 45% 45%",
      color:"black",
      top:"5px"
    },

    {
      width:"240px",
      height:"180px",
      radius:"120px 120px 120px 120px",
      color:"#d4a017",
      top:"15px"
    },

    {
      width:"270px",
      height:"210px",
      radius:"90px 90px 120px 120px",
      color:"#800080",
      top:"8px"
    },

    {
      width:"245px",
      height:"160px",
      radius:"40px 40px 80px 80px",
      color:"#111",
      top:"20px"
    }

  ];

  const boyStyles = [

    {
      width:"230px",
      height:"90px",
      radius:"50px",
      color:"black",
      top:"10px"
    },

    {
      width:"220px",
      height:"100px",
      radius:"20px",
      color:"#5c4033",
      top:"5px"
    },

    {
      width:"240px",
      height:"80px",
      radius:"70px",
      color:"#d4a017",
      top:"15px"
    }

  ];

  if(currentGender === "girl"){

    let random =
    girlStyles[Math.floor(Math.random()*girlStyles.length)];

    hair.style.width = random.width;
    hair.style.height = random.height;
    hair.style.borderRadius = random.radius;
    hair.style.background = random.color;
    hair.style.top = random.top;

  }

  else{

    let random =
    boyStyles[Math.floor(Math.random()*boyStyles.length)];

    hair.style.width = random.width;
    hair.style.height = random.height;
    hair.style.borderRadius = random.radius;
    hair.style.background = random.color;
    hair.style.top = random.top;

  }

}

// 🔥 Dress Styles

function changeDress(){

  let body =
  document.getElementById("body");

  const dresses = [

    {
      color:"#ff4d6d",
      radius:"60px 60px 35px 35px"
    },

    {
      color:"#4d79ff",
      radius:"30px"
    },

    {
      color:"#28a745",
      radius:"80px 80px 20px 20px"
    },

    {
      color:"#ff9800",
      radius:"50px"
    },

    {
      color:"#800080",
      radius:"100px 100px 40px 40px"
    }

  ];

  let random =
  dresses[Math.floor(Math.random()*dresses.length)];

  body.style.background =
  random.color;

  body.style.borderRadius =
  random.radius;

}

// 🔥 Skin Tone

function changeSkin(){

  let face =
  document.getElementById("face");

  let skins = [

    "#f2c9a0",
    "#e0ac69",
    "#c68642",
    "#8d5524"

  ];

  let random =
  skins[Math.floor(Math.random()*skins.length)];

  face.style.background = random;

}

// 🔥 Earrings

function changeEarrings(){

  let earrings =
  document.getElementById("earrings");

  let colors = [

    "gold",
    "silver",
    "#ff4d6d",
    "#00bfff"

  ];

  let random =
  colors[Math.floor(Math.random()*colors.length)];

  earrings.style.background =
  random;

}

// 🔥 Rings

function changeRing(){

  let ring =
  document.getElementById("ring");

  let colors = [

    "gold",
    "silver",
    "#ff4d6d"

  ];

  let random =
  colors[Math.floor(Math.random()*colors.length)];

  ring.style.background =
  random;

}

// 🔥 Save Avatar

function saveAvatar(){

  alert("✅ Premium Avatar Saved!");

}

// 🔥 Download Avatar

function downloadAvatar(){

  html2canvas(document.getElementById("avatar"))
  .then(canvas => {

    const link =
    document.createElement("a");

    link.download =
    "cartly-avatar.png";

    link.href =
    canvas.toDataURL();

    link.click();

  });

}