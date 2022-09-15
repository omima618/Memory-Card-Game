// random cards
var images = document.querySelectorAll('.card-img');
var sourcesArr = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png',
];

images.forEach((image) => {
    var randomSrc = Math.floor(Math.random() * sourcesArr.length);
    var source = sourcesArr.splice(randomSrc, 1);
    image.src = source;
});
