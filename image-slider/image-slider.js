const d = document;
let autoScrollInterval;
let imgNum;

function getImageFileNames() {
  const context = require.context('./assets', false, /\.(png|jpe?g|gif|svg)$/);
  return context.keys().map(key => context(key));
}

function getImages() {
  const fileNames = getImageFileNames();
  const images = [];

  imgNum = fileNames.length;
  const numImgsEven = imgNum % 2 === 0;
  const mid = numImgsEven ? (imgNum / 2) : Math.floor(imgNum / 2) + 1;

  fileNames.forEach((file, index) => {
    const img = new Image();
    img.src = file;
    img.alt = "A cat doing something cute";
    img.setAttribute('data-image-id', String(index + 1));
    img.classList.add('slider-img');

    if ((index + 1) < mid - 1 || (index + 1) > mid + 1) {
      img.classList.add('hide-behind');
    }

    if ((index + 1) === mid - 1) {
      img.classList.add('hide-left');

    } else if ((index + 1) === mid + 1) {
      img.classList.add('hide-right')
    }

    images.push(img);
  });

  return images;
}

function scrollLeft(targetId, currentlyDisplayedId) {
  const currentlyDisplayedImg = d.body.querySelector(`[data-image-id="${currentlyDisplayedId}"]`);

  const allImgs = Array.from(d.body.querySelectorAll('img.slider-img'));

  currentlyDisplayedImg.classList.add('hide-left');

  allImgs.forEach(img => {
    const imgId = parseInt(img.getAttribute("data-image-id"), 10);

    if (imgId === currentlyDisplayedId + 1) {
      img.classList.remove('hide-right');
    } else if (imgId === currentlyDisplayedId + 2) {
      img.classList.remove('hide-behind');
      img.classList.add('hide-right');
    } else if (imgId === currentlyDisplayedId - 1) {
      img.classList.add('hide-behind');
      img.classList.remove('hide-left');
    }

  });

  if (targetId > currentlyDisplayedId + 1) {
    setTimeout(() => {
      scrollLeft(targetId, currentlyDisplayedId + 1);
    }, 500);
  }
}

function scrollRight(targetId, currentlyDisplayedId) {
  const currentlyDisplayedImg = d.body.querySelector(`[data-image-id="${String(currentlyDisplayedId)}"]`);

  const allImgs = Array.from(d.body.querySelectorAll('img.slider-img'));

  currentlyDisplayedImg.classList.add('hide-right');

  allImgs.forEach(img => {
    const imgId = parseInt(img.getAttribute("data-image-id"), 10);

    if (imgId === currentlyDisplayedId - 1) {
      img.classList.remove('hide-left');
    } else if (imgId === currentlyDisplayedId - 2) {
      img.classList.remove('hide-behind');
      img.classList.add('hide-left');
    } else if (imgId === currentlyDisplayedId + 1) {
      img.classList.add('hide-behind');
      img.classList.remove('hide-right');
    }
  });

  if (targetId < currentlyDisplayedId - 1) {
    setTimeout(() => {
      scrollRight(targetId, currentlyDisplayedId - 1);
    }, 500);
  }
}

function showAssociatedImage(ev) {
  const targetDot = ev.target;
  const dotId = targetDot.getAttribute("data-dot-id");
  const prevDot = targetDot.parentNode.querySelector('.active');

  prevDot.classList.remove('active');
  targetDot.classList.add('active');

  const currentlyDisplayedImg = d.body.querySelector('img:not(.hide-right):not(.hide-left):not(.hide-behind)');
  const currentlyDisplayedId = currentlyDisplayedImg.getAttribute("data-image-id");

  const targetImg = d.body.querySelector(`[data-image-id="${dotId}"]`);

  if (currentlyDisplayedImg === targetImg) {
    return;
  }

  const targetId = parseInt(dotId, 10);
  const displayedId = parseInt(currentlyDisplayedId, 10);

  if (targetId > displayedId) {
    scrollLeft(targetId, displayedId);
  } else {
    scrollRight(targetId, displayedId);
  }
}

function getDotBtns() {
  const imageNumIsEven = imgNum % 2 === 0;

  const activeDotIndex = imageNumIsEven ? imgNum / 2 : Math.floor(imgNum / 2);

  const dotBtnContainer = d.createElement('div');
  dotBtnContainer.classList.add('dot-btn-container');

  for (let i = 0; i < imgNum; i++) {
    const dotBtn = d.createElement('div');
    dotBtn.classList.add('dot-btn');
    dotBtn.setAttribute("data-dot-id", String(i + 1));
    dotBtn.addEventListener("click", function(ev) {
      clearInterval(autoScrollInterval);
      showAssociatedImage(ev);
    });

    if (i === activeDotIndex) {
      dotBtn.classList.add('active');
    }

    dotBtnContainer.appendChild(dotBtn);
  }

  return dotBtnContainer;
}

function autoScroll(images, autoScrollIndex) {
  const imgs = images;

  const hideBehind = imgs[(autoScrollIndex - 2) % imgNum];
  const hideLeft = imgs[(autoScrollIndex - 1) % imgNum];
  const nextDisplayed = imgs[(autoScrollIndex) % imgNum];
  const removeHideBehind = imgs[(autoScrollIndex + 1) % imgNum];

  const activeDotIndex = ((autoScrollIndex) % imgNum) + 1;

  const activeDot = d.body.querySelector(".dot-btn.active");
  activeDot.classList.remove('active');

  const nextActiveDot = d.body.querySelector(`[data-dot-id="${activeDotIndex}"]`);
  nextActiveDot.classList.add('active');

  hideBehind.classList.add('hide-behind');
  hideBehind.classList.remove('hide-left');

  hideLeft.classList.add('hide-left');

  nextDisplayed.classList.remove('hide-right');

  removeHideBehind.classList.remove('hide-behind');
  removeHideBehind.classList.add('hide-right');
}

export default function ImageSlider() {
  const container = d.createElement('div');
  container.classList.add('image-slider-container');

  const containerInner = d.createElement('div');
  containerInner.classList.add('image-slider-container-inner');

  const images = getImages();

  images.forEach(image => {
    containerInner.appendChild(image);
  });

  const dotBtnContainer = getDotBtns(imgNum);

  container.appendChild(containerInner);
  container.appendChild(dotBtnContainer);

  document.addEventListener('DOMContentLoaded', function() {
    const autoScrollIndexStr = d.body.querySelector('.dot-btn.active').getAttribute("data-dot-id");
    let autoScrollIndex = parseInt(autoScrollIndexStr, 10);

    autoScrollInterval = setInterval(() => {
      autoScroll(images, autoScrollIndex);
      autoScrollIndex += 1;
    }, 4000);
  });

  return container;
}
