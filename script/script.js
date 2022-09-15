var cardsContainer = document.querySelector('.cards-container');
var matchesCount = document.querySelector('.matches span');
var turnsCount = document.querySelector('.turns span');
var newGameButton = document.querySelector('.new-game');
var restartGameBtn = document.querySelector('.restart-game');
var allCards = Array.from(cardsContainer.children);

var flipAudio = new Audio('media/flip-card.mp3');
var wrongAudio = new Audio('media/wrong.mp3');
var correctAudio = new Audio('media/correct.mp3');
var finishedAudio = new Audio('media/finished.mp3');

var cardBgColor = '#54c6a6';
var clicks = 0;
var turns = 0;
var matches = 0;
var source1;
var source2;
var card1;
var img1;

function routateCard(card, image, display, bgColor, routateDegree) {
    card.style.transform = `rotateY(${routateDegree}deg)`;
    setTimeout(() => {
        card.style.backgroundColor = bgColor;
        image.style.display = display;
    }, 200);
}

function checkClicks(card, img) {
    if (clicks === 1) {
        routateCard(card, img, 'block', 'transparent', 180);
        card1 = card;
        img1 = img;
        source1 = img.src;
        flipAudio.play();
    }
    if (clicks === 2) {
        routateCard(card, img, 'block', 'transparent', 180);
        turns++;
        turnsCount.innerHTML = turns;
        source2 = img.src;
        flipAudio.play();
        compareSource(source1, source2, card1, card, img1, img);
        isGameFinished();
        clicks = 0;
    }
}

function compareSource(src1, src2, card1, card2, img1, img2) {
    if (src1 === src2) {
        matches++;
        setTimeout(() => {
            correctAudio.play();
            routateCard(card1, img1, 'block', 'transparent', 0);
            routateCard(card2, img2, 'block', 'transparent', 0);
            matchesCount.innerHTML = matches;
        }, 700);
        setTimeout(() => {
            card1.classList.remove('card');
            card2.classList.remove('card');
            card1.classList.add('blur');
            card2.classList.add('blur');
        }, 1000);
    } else {
        source1 = '';
        source2 = '';
        setTimeout(() => {
            wrongAudio.play();
            routateCard(card1, img1, 'none', cardBgColor, 0);
            routateCard(card2, img2, 'none', cardBgColor, 0);
            card1.classList.remove('clicked');
            card1.classList.add('card');
            card2.classList.remove('clicked');
            card2.classList.add('card');
        }, 700);
    }
}

function isGameFinished() {
    var cardsList = document.querySelectorAll('.card');
    if (cardsList.length !== 0) return;
    setTimeout(() => {
        finishedAudio.play();
        cardsContainer.style.display = 'none';
    }, 1200);
}

function restartGame() {
    allCards.forEach((card) => {
        var img = card.querySelector('.card-img');
        routateCard(card, img, 'none', cardBgColor, 0);
        card.classList.remove('blur');
        card.classList.remove('clicked');
        card.classList.add('card');
    });
    cardsContainer.style.display = 'flex';
    clicks = 0;
    turns = 0;
    matches = 0;
    matchesCount.innerHTML = matches;
    turnsCount.innerHTML = turns;
}

document.addEventListener('click', (e) => {
    var card = e.target;
    if (!card.classList.contains('card')) return;
    var img = card.querySelector('.card-img');
    card.classList.remove('card');
    card.classList.add('clicked');
    clicks++;
    checkClicks(card, img);
});

newGameButton.addEventListener('click', () => {
    location.reload();
});

restartGameBtn.addEventListener('click', () => {
    restartGame();
});
