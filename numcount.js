let numCounter = document.querySelector('.counter');
let addNumCount = document.querySelector('.addCount');
let numCount = 0;
// addNumCount.addEventListener('click', function (event) {
//     numCount += 1;
//     numCounter.innerHTML = numCount;
// });

function myNumCounter() {
    numCount += 1;
    numCounter.innerHTML = numCount;
}