// variables

let answer = [];
let guessBtn = document.getElementById("btn");  
let input = document.getElementById("inp");
let startBtn = document.getElementById('start');
let showAnswer = document.getElementById('showAnswer');
let seeAnswer =document.getElementById('seeAnswer');


// function

function start() {
  // 對 pool 迭代四次，每次抽離一個數，並推進 answer 中
  // 用 pool 長度，去作為隨機數，用隨機數去選擇下一次被抽離的數
  let pool = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * pool.length); // 用長度取隨機數
    answer.push(pool[index]); // 將隨機數對應到 pool 中的值推到 answer
    pool.splice(index, 1); // 將隨機數對應到 pool 中的值從 pool 中移除
  };
  startBtn.classList.add('done');
  showAnswer.innerHTML = `？？？？`;
  input.classList.remove('done'); 
  guessBtn.classList.remove('done');
  seeAnswer.classList.remove('done');
  document.getElementById("compared-list").innerHTML = '';  
}

function newGuess(e) {
// newGuess 內容：抓取 input 的值，將 input 的值新建到紀錄板塊
  
  let userN = document.getElementById("inp").value; // 抓取 input 的值
  
  // 檢查 userN 是否符合規定
  // 若符合則與 answer 比對
  // 將比對結果與 userN 新建到板塊上
  if (check(userN)) {    
  // 與 answer 比對     
  let contrast = compared(userN);
  console.log(answer,contrast);
  document.getElementById("compared-list").innerHTML += 
    `<div>
    <span class="compared">${contrast[0]}A${contrast[1]}B</span>
    <span class="userNum">${userN}</span>
  </div>`; // 新建到紀錄板塊
  isRight(contrast);
  } else {
    alert("請輸入四位不重複的數字");
  }
  
}

function giveAnswer() {
  input.blur();
  closeBtn();
  showAnswer.innerHTML = `${answer.join("")}`;
  answer = [];
}

function isRight(contrast) {
  if (contrast[0] !== 4) return;
  alert("恭喜答對了!");
  giveAnswer();
  seeAnswer.classList.add('done'); 
}

function closeBtn() {
  input.classList.add('done'); 
  guessBtn.classList.add('done'); 
  startBtn.classList.remove('done');
  seeAnswer.classList.add('done'); 
}

function check (userN) {
  if (userN.length !== 4) return false;
  // split('') 轉成 array 且用 sort() 排序
  // 若排序後 當前值與下一個值相等 false 
  let userGuessSort = userN.split('').sort();
  for (let i = 0; i < userGuessSort.length; i++) {
    if (userGuessSort[i] === userGuessSort[i+1]) {
      return false;
    }
  }
  return true; 
}

function compared (userN) {
// compared 內容
// 將 userN 處理後運用 split() 轉為 array
// userN 的 array 去與 answer 的 array 去迭代對比
  let a = 0;
  let b = 0;
  let userGuess = userN.split(''); // str.split('') 分隔每一個字符，回傳一個 array
  for (let i = 0; i < userGuess.length; i++) {
    let index = answer.indexOf(userGuess[i])
    if (index === -1) continue;
    if (userGuess[index] === answer[index]) {
      a++;
    } else {
      b++;
    }     
  }
  let compared = [a, b]
  return compared;
}

function limitLength(){
  if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
  }
}


// event
guessBtn.addEventListener("click", newGuess);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") newGuess(e);
  if (e.key === "e") {
    e.preventDefault();
  }
});
startBtn.addEventListener('click', start);
seeAnswer.addEventListener('click', giveAnswer);