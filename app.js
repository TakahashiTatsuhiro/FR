// グローバル変数 ===================================================
let searchWord = "";

const images = [
  "./images/ariel.jpg",
  "./images/cute_dog.jpg",
  "./images/leaving_work.jpg",
  "./images/mountain.jpg",
  "./images/rever.jpg",
];

// 関数======================================================
// newsfeedの表示
function makeNewsfeed3(containerEl, _searchWord) {
  // 旧表示を削除
  containerEl.innerText = "";

  // 表示する
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];

    // card-out
    const cardOutEl = document.createElement("div");
    cardOutEl.className = "cardOut";

    // card-in
    const cardInEl = document.createElement("div");
    cardInEl.className = "cardIn";

    // card-in アイコン
    const iconEl = document.createElement("img");
    iconEl.className = "icon";
    iconEl.src = post.icon;
    iconEl.alt = "アイコン用画像";
    cardInEl.append(iconEl);

    // 名前
    const friendEl = document.createElement("p");
    friendEl.className = "name";
    friendEl.innerText = `${post.friend}`;
    cardInEl.append(friendEl);

    // cardOutにcardInを入れる
    cardOutEl.append(cardInEl);

    // 本文
    const postEl = document.createElement("p");
    postEl.className = "post";
    postEl.innerText = post.text;
    cardOutEl.append(postEl);

    // 写真
    const imgEl = document.createElement("img");
    imgEl.className = "img";
    imgEl.src = post.image;
    imgEl.alt = "投稿用画像";
    cardOutEl.append(imgEl);

    // 気分
    const feelingEl = document.createElement("p");
    feelingEl.className = "feeling";
    feelingEl.innerText = `${post.feeling}`;
    cardOutEl.append(feelingEl);

    // タイムスタンプ
    const timestampEl = document.createElement("p");
    timestampEl.className = "timestamp";
    const m = moment(post.timestamp);
    const diff = moment().diff(m, "minute");
    if (diff > 3600) {
      timestampEl.innerText = `${Math.trunc(diff / 3660)}日前`;
    } else if (diff > 60) {
      timestampEl.innerText = `${Math.trunc(diff / 60)}時間前`;
    } else {
      timestampEl.innerText = `${diff}分前`;
    }
    cardOutEl.append(timestampEl);

    // 採否
    if (_searchWord === "") {
      containerEl.append(cardOutEl);
    } else if (cardOutEl.innerHTML.includes(_searchWord)) {
      containerEl.append(cardOutEl);
    }
  }
}

const load = () => {
  const containerEl = document.querySelector("#newsfeed"); // newsfeedとはdiv要素のこと
  makeNewsfeed3(containerEl, searchWord);
};

const getRandomElement = (array) => {
  // Given an array, returns a random element
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

function enterName() {
  username = window.prompt("What is your name?");
  localStorage.setItem("username", username);
  const h2 = document.getElementById("username");
    h2.innerText = `user：${username}`;
}

// loadイベント======================================================
window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  // localStorage.setItem("username", "Johnny Depp");
  let username = localStorage.getItem("username");
  if (!username) {
    enterName();
  } else {
    const h2 = document.getElementById("username");
    h2.innerText = `user：${username}`;
  }

  load();

  // 1秒ごとに更新
  setInterval(load, 1000);
});

// リネーム
const userNameTag = document.getElementById("username");
userNameTag.addEventListener("click", () => {
  enterName();
});

// 検索ボタン======================================================
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  searchWord = document.getElementById("searchInput").value;
  load();
});

// 更新ボタン======================================================
// const reloadButton = document.getElementById("reloadButton");
// reloadButton.addEventListener("click", () => {
//   load();
// });

// 投稿ボタン======================================================
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {
  // 実行要否判定
  if (document.getElementById("postArea").value === "") {
    return;
  }
  // feeling選択
  const feelingSelect = document.getElementById("feelingSelect");
  const idx = feelingSelect.selectedIndex;

  // 投稿
  const postObj = {
    friend: localStorage.getItem("username"), //自分の名前
    text: document.getElementById("postArea").value, // 投稿内容
    feeling: feelingSelect.options[idx].value,
    image: "./images/pirates.jpeg",
    icon: "./icons/jack.jpeg",
    timestamp: new Date(), // 現在時刻
  };
  if (bacefook.friends[postObj.friend] === undefined) {
    bacefook.friends[postObj.friend] = [];
  }
  bacefook.friends[postObj.friend].push(postObj);
  bacefook.newsfeed.push(postObj);
  load();

  // 掃除
  document.getElementById("postArea").value = "";
  feelingSelect.selectedIndex = 0;
});
