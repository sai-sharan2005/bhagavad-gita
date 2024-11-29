
//   ----------------------/Database Integration/-----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDo8jilTTNDFBjCDq0Kufu3HMcHdzhyMnk",
  authDomain: "bhagavad-gita-c4dbb.firebaseapp.com",
  databaseURL: "https://bhagavad-gita-c4dbb-default-rtdb.firebaseio.com",
  projectId: "bhagavad-gita-c4dbb",
  storageBucket: "bhagavad-gita-c4dbb.firebasestorage.app",
  messagingSenderId: "920805007847",
  appId: "1:920805007847:web:ebc4d72f556844d06a5d42",
  measurementId: "G-K30FLZR7WW"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------/Fetching Data/-------------------------------
function fetchTranslation(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Translations/${languageKey}`
  );
  get(tranRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("shloka-box").innerHTML = snapshot.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}

function fetchMeaning(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Meaning/${languageKey}`
  );
  get(tranRef)
    .then((snapshot2) => {
      if (snapshot2.exists()) {
        document.getElementById("meaning-box").innerHTML = snapshot2.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}
//----------------------/Database Integration End/-----------------------

window.changeText = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};
window.translateMeaning = function (languageKey) {
  fetchMeaning(window.currentShlokaNum, languageKey);
};

//-----------------------------/Onclick functions/-----------------------------
window.navClick = async function (shlokaNumber) {
  window.currentShlokaNum = shlokaNumber;
  const mainRef = ref(database, `Shloka-${shlokaNumber}/main`);
  const meaningRef = ref(database, `Shloka-${shlokaNumber}/meaning`);
  const audioRef = ref(database, `Shloka-${shlokaNumber}/aud`);
  const audio1Ref = ref(database, `Shloka-${shlokaNumber}/audm`);
  const wordtowordRef = ref(database, `Shloka-${shlokaNumber}/wordtoword`);

  const snapshot = await get(audioRef);
  const snapshot3 = await get(audio1Ref);
  const snapshot1 = await get(mainRef);
  const snapshot2 = await get(meaningRef);
  const snapshot4 = await get(wordtowordRef);

  if (snapshot.exists()) {
    const audioUrl = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot3.exists()) {
    const audioUrl1 = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl1;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot1.exists()) {
    const mainText = snapshot1.val();
    document.getElementById("shloka-box").innerHTML = mainText;
  } else {
    console.error("No text data found.");
  }
  if (snapshot4.exists()) {
    const wordtowordText = snapshot4.val();
    document.getElementById("wordtoword-box").innerHTML = wordtowordText;
  } else {
    console.error("No text data found.");
  }
  if (snapshot2.exists()) {
    const meaningText = snapshot2.val();
    document.getElementById("meaning-box").innerHTML = meaningText;
  } else {
    console.error("No text data found.");
  }
};
