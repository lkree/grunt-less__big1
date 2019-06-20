'use strict';

(function() {
  let deliveryGetter = {
    // deliveryCompanies: [zhelDor, cdek, pek, dellin, kit],
    deliveryCompanies: [kit],
    status: 0,

    inner: function() {   
      let onSearchButton = (evt) => {
        if (evt !== undefined && evt.keyCode !== 13 && evt.keyCode !== undefined || document.querySelector('.deliveryInput').value === '') {
          return;
        }

        this.usersCity = this.escapeHtml(document.querySelector('.deliveryInput').value).slice(0, 32);
          
        if (this.status === 0) {
          let tbody = document.querySelector('.deliveryTable tbody');
          tbody.innerHTML = '';
        }

        this.currentEl = this.deliveryCompanies[this.status];
        this.currentEl.inner(this.usersCity);
        this.continueLogic();
      }

      if (this.status > 0) {
        onSearchButton();
      } else {
        let searchCityBtn = document.querySelector('.searchCityBtn');

        searchCityBtn.addEventListener('click', onSearchButton);
        document.addEventListener('keydown', onSearchButton);
      }
    },

    escapeHtml: function (text) {
      let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
    
      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },

    continueLogic: function() {
      if (this.status == (this.deliveryCompanies.length-1)) {
        this.status = 0;
        this.usersCity = '';
      } else {
        ++this.status;
        this.inner();
      }
    }
  }

  deliveryGetter.inner();

  function togglerHandler(evt) {
    evt.preventDefault();
    let div = document.querySelector('.b-nep-col-tchars div'),
      p = document.querySelector('.b-nep-col-tchars p'),
      path = event.path || (event.composedPath && event.composedPath());
    
      path[1].classList.toggle('move-toggler');
      div.classList.toggle('hidden');
      p.classList.toggle('hidden');
    
      evt.target.textContent === 'Раскрыть' ? evt.target.textContent = 'Свернуть' : evt.target.textContent = 'Раскрыть';
    }
    
      let toggler = document.querySelector('.showDeliveryBtn');
    
    toggler.addEventListener('click', togglerHandler);
})();