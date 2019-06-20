(function() { //YandexMetrika add2Backet tracker
  document.addEventListener('click', function(evt) {
    const add2backetBtn = document.querySelector('.b-nep-pwai-btn-add'),
          target = evt.target === add2backetBtn;

    if (target) {
      ym(49968697, 'reachGoal', 'add2backetClick');
      return true;
    }
  });
})();