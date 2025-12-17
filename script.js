const quiz = [
  {
    word: "concern",
    choices: ["コンサート", "関心事", "不満", "コンツェルン"],
    answer: 1
  },
  {
    word: "region",
    choices: ["地域", "音", "理由", "リヨン"],
    answer: 0
  },
  {
    word: "immediately",
    choices: ["優しく", "難しく", "直ちに", "大事に"],
    answer: 2
  },
  {
    word: "afford",
    choices: ["に従う", "速い", "中の", "を持つ余裕がある"],
    answer: 3
  },
  {
    word: "grocery",
    choices: ["成長", "食料雑貨店", "栄光", "粗さ"],
    answer: 1
  },
  {
    word: "fuel",
    choices: ["枯葉", "風邪", "燃料", "うわさ"],
    answer: 2
  },
  {
    word: "hire",
    choices: ["を貸し切る", "上る", "を雇う", "高く"],
    answer: 2
  },
  {
    word: "huge",
    choices: ["穴", "危険な", "ばく大な", "天才な"],
    answer: 2
  },
  {
    word: "relative",
    choices: ["生き返った", "絶対的", "優れている", "親類"],
    answer: 3
  },
  {
    word: "disturb",
    choices: ["を混ぜる", "の邪魔をする", "を避ける", "歩き回る"],
    answer: 1
  }
];

let current = 0;
let score = 0;
let answered = false;

// ★ 追加：開始時間と終了時間
let startTime;
let endTime;

const question = document.getElementById("question");
const buttons = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");

function loadQuiz() {
  // 最初の問題が読み込まれたときに時間計測開始
  if (current === 0) {
    startTime = new Date();
  }

  result.innerText = "";
  answered = false;

  question.innerText = quiz[current].word;
  questionNumber.innerText = `第 ${current + 1} 問 / ${quiz.length} 問`;

  buttons.forEach((btn, index) => {
    btn.innerText = quiz[current].choices[index];
    btn.disabled = false;
  });
}

function checkAnswer(index) {
  answered = true;
  buttons.forEach(btn => btn.disabled = true);

  if (index === quiz[current].answer) {
    result.innerText = "⭕ 正解！";
    score++;
  } else {
    result.innerText = "✖️ 不正解！";
  }
}

function nextQuestion() {

  // ★ 未回答のとき確認する
  if (!answered) {
    const goNext = confirm("まだ回答していません。本当に次の問題に進みますか？");

    if (!goNext) {
      return;
    }

    result.innerText = "✖️ 未回答";
  }

  current++;

  if (current >= quiz.length) {
    endTime = new Date();
    showResult();
    return;
  }

  loadQuiz();
}

function showResult() {
  const timeDiff = Math.floor((endTime - startTime) / 1000); // 秒
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;

  question.innerText = "クイズ終了！";
  questionNumber.innerText = "";
  document.getElementById("choices").style.display = "none";

  result.innerText =
    `あなたの結果：${quiz.length} 問中 ${score} 問正解 🎉\n` +
    `所要時間：${minutes} 分 ${seconds} 秒`;

  document.getElementById("nextBtn").style.display = "none";
}

loadQuiz();
