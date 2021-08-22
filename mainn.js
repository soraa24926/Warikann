(function() {
  'use strict';
var price = document.getElementById("price");
var people = document.getElementById("people");
var unit = document.getElementById("unit");
var btn = document.getElementById("btn");
var result = document.getElementById("result");
var reset = document.getElementById("reset");

// 入力済みかのチェック
function checkinput(){
  // matchで正規表現を表示、/で囲む、\dで数字、+でそれ(\d)が１個以上を示す
  // nullはなしで!==は〜でないなので、数字が１個以上入ってなくない場合nobtnを消す
  if(price.value.match(/\d+/) !== null && people.value.match(/\d+/) !== null){
    btn.classList.remove("nobtn");
  }else{
    btn.classList.add("nobtn");
  }
}

// 画面表示の際に金額をすぐ入力できる様にフォーカス
price.focus();

// 金額、人数の入力された際に入力済みかチェック
price.addEventListener("keyup",checkinput);
people.addEventListener("keyup",checkinput);
  
// btnがクリックされたら
btn.addEventListener("click", function(){

  // クラスにnobtnが含まれてたら　contains＝含まれる this=btnに
  if(this.classList.contains("nobtn") === true){
    // 折り返し
    return;
  }

  // 少ない額計算　Math.floorが切り捨て
  const payless = Math.floor(price.value / people.value / unit.value) * unit.value;
  // 少ない額で足りない額計算
  const short = price.value - (payless * people.value);
  // 多い額計算　Math.ceilが繰り上げ
  const paymore = Math.ceil(price.value / people.value / unit.value) * unit.value;
  // 多い額の余り計算　Math.adsが負の数を正の数で表示
  const over = Math.abs(price.value - (paymore * people.value));

  // 結果画面表示テキスト
  let answer;
  if(short === 0 && over === 0){
    answer = "一人" + (price.value / people.value) + "円ちょうどです！";
  }else{
    answer = "一人" + payless + "円だと" + short + "円足りません、" + 
    "一人" + paymore + "円だと" + over + "円余ります。";
  }
  // 結果画面に表示
  result.textContent = answer;
  
  // rsetの隠し外し
  reset.classList.remove("hidden");
});

// リセットが押されたら
reset.addEventListener("click",function(){
  // 全システムの初期化
  result.textContent = "ここに結果を表示します";
  price.value = "";
  people.value ="";
  unit.value = 100;
  btn.classList.add("nobtn");
  reset.classList.add("hidden");
  price.focus();
});

})();