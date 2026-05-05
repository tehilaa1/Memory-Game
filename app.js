let onelevel = ["🚗", "🚗","🚙", "🚙","🏎️", "🏎️"];
let towlevel=  ["🐶", "🐶","🐱", "🐱", "🐭", "🐭","🐰", "🐰", "🦊", "🦊","🐻", "🐻"];
let threelevel= ["🍎", "🍎", "🍌", "🍌","🍕", "🍕","🍔", "🍔","🍟", "🍟","🌭", "🌭","🍣", "🍣","🍩", "🍩","🍪", "🍪","🍫", "🍫", "🍓", "🍓", "🥑", "🥑"];
let cards = onelevel;
let shuffled = cards.sort(() => Math.random() - 0.5);

let first = null;
let second = null;
let numoflevel=1;// סופר שלבים
let matched = [];
let canClick = true;
let tries = 0;
let bgMusic = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
bgMusic.loop = true;   // 🔁 שיחזור כל הזמן
bgMusic.volume = 0.3;  // 🔉 חלש כדי שלא יפריע
let musicStarted = false;
let clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
clickSound.preload = "auto"; // מבטיח שהדפדפן יוריד את הקובץ מיד
let muted=true;

function render() {
 let html = "";

    html += `
    <button class="mute-btn" onclick="toggleMute()">
    ${muted ? "🔇 " : " Mute"}
    </button>
  `;
  


  shuffled.forEach((card, index) => {

    if (matched.includes(index)) {
     html += `<button disabled>*</button>`;
    }

    else if (index === first || index === second) {
     html += `<button disabled>${card}</button>`;
    }

    else {
     html += `<button onclick="flip(${index})">+</button>`;
    }

  }); // ✔ סגירת forEach

  document.getElementById("game").innerHTML = html;
} // ✔ סגירת render



function flip(index) {
    
  if (!canClick) return;
  startMusic();
  if (first === null) {
    first = index;
  } else if (second === null && index !== first) {
    second = index;
    checkMatch();
  }
  render();
}

function startMusic() {
  if (muted) return; //

  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }
}

function toggleMute() {
  muted = !muted;

  if (muted) {
    bgMusic.pause(); // עוצר מיד
  } else {
    // אם רוצים להמשיך מוזיקה
    if (musicStarted) {
      bgMusic.play();
    }
  }

  render();
}

function checkMatch() {
  canClick = false;
  tries += 1;
  if (shuffled[first] === shuffled[second]) {
    matched.push(first, second);
    reset();
  } else {
    setTimeout(() => {
      reset();
    }, 800);
  }
  checkWin();
}

function checkWin() {
  if (matched.length === shuffled.length) {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      let again = confirm("good you heve: " + tries+" next level?");
      if (again) {
        numoflevel+=1;
        restartGame();
        
      }
    }, 300);
  }
}
function reset() {
  first = null;
  second = null;
  canClick = true;
  render();
}

function restartGame() {
  if(numoflevel==1){
    cards = onelevel;
  }
  if(numoflevel==2){
    cards = towlevel;
  }
  if(numoflevel==3){
    cards = threelevel;
  }
  if(numoflevel>3){
    cards = onelevel;
    numoflevel=1;
  }
  shuffled = cards.sort(() => Math.random() - 0.5);

  first = null;
  second = null;
  matched = [];
  tries = 0;

  render();
}

render();