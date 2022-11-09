'use strict';

// #pragma Globals

let productArray = [];
let voteCount = 25;
let previousArray = [];

// #pragma DOM References

let imageContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('results-btn');

let resultsContainer = document.getElementById('results-container');

// For my canvas chart: Step 1: Getting element by ID
let chartContext = document.getElementById('my-chart').getContext('2d');


// #pragma Helper Function

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function uniqueImagesChecker() {
  let imageArray = [];
  while (imageArray.length < 3) {
    let randomImage = randomIndex();
    if (imageArray.includes(randomImage) || previousArray.includes(randomImage)) {
      // do nothing
    }
    else {
      imageArray.push(randomImage);
    }
  }
  previousArray = imageArray;
  return (imageArray);
}

function renderImages() {
  let threeNewImages = uniqueImagesChecker();
  let imgOneIndex = productArray[threeNewImages[0]];
  let imgTwoIndex = productArray[threeNewImages[1]];
  let imgThreeIndex = productArray[threeNewImages[2]];

  // while (imgOneIndex === imgTwoIndex) {
  //   imgTwoIndex = randomIndex();
  // }
  // while (imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
  //   imgThreeIndex = randomIndex();
  // }

  imgOne.src = imgOneIndex.imagePath;
  imgTwo.src = imgTwoIndex.imagePath;
  imgThree.src = imgThreeIndex.imagePath;

  imgOne.alt = imgOneIndex.name;
  imgTwo.alt = imgTwoIndex.name;
  imgThree.alt = imgThreeIndex.name;

  imgOneIndex.views++;
  imgTwoIndex.views++;
  imgThreeIndex.views++;



}

// #pragma Event Handler

function handleShowResults(event) {
  // displey 25 rounds
  if (voteCount === 0) {
    // show results of voting

    let productNames = [];
    let productClicks = [];
    let productViews = [];
    for (let i = 0; i < productArray.length; i++) {
      productNames.push(productArray[i].name);
      productViews.push(productArray[i].views);
      productClicks.push(productArray[i].clicks);
    }
    console.log(productNames, productClicks, productViews);


    let chartConfig = {
      type: 'bar',
      data: {
        datasets: [{
          label: '# of Views',
          data: productViews,
          backgroundColor: 'pink',
        }, {
          label: '# of Clicks',
          data: productClicks,
          backgroundColor: 'white',
        }],
        labels: productNames,
      },
      options: {},
    };

    let myChart = new Chart(chartContext, chartConfig);

    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} was viewed: ${productArray[i].views} time(s) and clicked: ${productArray[i].clicks}`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

function handleImageClick(event) {
  console.dir(event.target);

  let productClicked = event.target.alt;

  console.log('image clicked', productClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === productClicked) {
      productArray[i].clicks++;
      // decerement votes to only have 25 total
      voteCount--;

      // render new images:
      renderImages();
    }
  }

  //  stop counting after 25
  if (voteCount === 0) {
    imageContainer.removeEventListener('click', handleImageClick);

  }
}

// #pragma Product Constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.imagePath = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  productArray.push(this);
}



// #pragma Executable

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dogDuck');
new Product('dragon');
new Product('pen');
new Product('petsweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('waterCan');
new Product('wineGlass');



renderImages();


imageContainer.addEventListener('click', handleImageClick);

resultsBtn.addEventListener('click', handleShowResults);
