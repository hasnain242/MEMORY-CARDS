const addcardbtn = document.getElementById("add-card");
const clearcardsbtn = document.getElementById("clear-cards");
const cardscon = document.getElementById("cards-con");
const prevbtn = document.getElementById("prev-btn");
const currentnav = document.getElementById("current-card");
const nextcardbtn = document.getElementById("next-btn");
const cancebtn = document.getElementById("cancel-btn");
const questioninput = document.getElementById("question");
const anwserinput = document.getElementById("anwser");
const addcardsubmitbtn = document.getElementById("add-card-btn");
const addcardcon = document.getElementById("add-card-con");
let currentCardID = 0;
const cards = [];
const cardData=getcarddata()
function getcarddata(){
  const cards=JSON.parse(localStorage.getItem('cards'))
  return cards===null?[]:cards;
}

function updatecurrentcardnav(){
  currentnav.innerText=`${currentCardID+1}/${cardData.length}`
}
function generateCards() {
  cardData.forEach((data, index) => generateCard(data, index));
}

function generateCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `
    <div class="inside-card">
      <div class="card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
  `;
  card.addEventListener('click',()=>card.classList.toggle('show-answer'))
  cards.push(card);
  cardscon.appendChild(card);
  updatecurrentcardnav()
}
nextcardbtn.addEventListener('click',()=>{
  cards[currentCardID].classList='card left';
  currentCardID++
  if(currentCardID>cards.length-1){
    currentCardID=0;
  }
  cards[currentCardID].classList='card active';
  updatecurrentcardnav()


})
prevbtn.addEventListener('click',()=>{
  cards[currentCardID].classList='card right';
  currentCardID--
  if(currentCardID<0){
    currentCardID=cards.length-1;
  }
  cards[currentCardID].classList='card active';
  updatecurrentcardnav()


})
function savecarddata(cardData){
  localStorage.setItem('cards',JSON.stringify(cardData))
  window.location.reload()
}
addcardbtn.addEventListener('click',()=> addcardcon.classList.add('active'))
cancebtn.addEventListener('click',()=> addcardcon.classList.remove('active'))
addcardsubmitbtn.addEventListener('click',()=>{
  const question=questioninput.value;
  const answer=anwserinput.value;
  if(question.trim()&&answer.trim()){
    const nextcard={question,answer}
    generateCard(nextcard)
    addcardcon.classList.remove('active')
    cardData.push(nextcard)
    savecarddata(cardData)
  }
  questioninput.value=''
  anwserinput.value=''
})
clearcardsbtn.addEventListener('click',()=> {
  localStorage.clear()
  cardscon.innerHTML='';
  window.location.reload()
})
generateCards();