const carSorter = (carMark) => {
  const carsWrapper = document.querySelector('.td-model'),
        cars = carsWrapper.querySelectorAll('li');
  carMark = carMark.toUpperCase();

  Array.from(cars)
    .map((el) => {
    if (~el.dataset.name.indexOf(carMark)) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }); 
};

const carController = (el) => {
  if (el.dataset.status === '1') {
    el.dataset.status = 0;

    const carsWrapper = document.querySelector('.td-model'),
          cars = carsWrapper.querySelectorAll('li');

    Array.from(cars)
      .forEach(el => el.style.display = 'none');
    return;
  }

  el.dataset.status = 1;
}

(function() {
  const markBtns = document.querySelectorAll('.car-chooser-list-tecdoc__point');

  Array.from(markBtns)
    .forEach((el) => {
    el.addEventListener('click', (evt) => {
      carSorter(evt.target.textContent);
      carController(evt.target);
    });
  });
})();

(function() {
  const toggler = document.querySelector('.car-type-toggler');

  const onTogglerChange = (evt) => {
    const truckContent = document.querySelector('.tabn');

    truckContent.classList.toggle('hidden');
  }

  toggler.addEventListener('change', onTogglerChange);
})();

/* .hidden {
  display: none;
}
.car-chooser-list-tecdoc, .td-model {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.car-chooser-list-tecdoc__point {
  border: 1px solid #000;
  padding: 10px 25px;
  border-radius: 15px;
  position: relative;
}
.car-chooser-list-tecdoc__point:hover {
  top: -5px;
  cursor: pointer;
  color: #ad1318;
}
li {
  display: inline-block;
} */

/* <section class="car-chooser-list-tecdoc">
  <div class="car-chooser-list-tecdoc__point">clio</div>
  <div class="car-chooser-list-tecdoc__point">megane</div>
  <div class="car-chooser-list-tecdoc__point">symbol</div>
  <div class="car-chooser-list-tecdoc__point">duster</div>
  <div class="car-chooser-list-tecdoc__point">logan</div>
</section> */