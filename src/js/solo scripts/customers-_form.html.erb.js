(function() { //creates referal input and removes office input
  const getInsertBeforeNode = (node) => {
    insertBeforeNode = Array.from(insertBeforeNode)
    .filter((el) => el.textContent === 'Адрес доставки')[0]
    .parentNode
    .parentNode;
  
    return insertBeforeNode;
  }
  
  
  let commonWrapper = document.querySelector('.wrap-r-col'),
      copiedTable = commonWrapper
        .querySelector('.reg-col')
        .cloneNode(true),
      oldTableData = copiedTable.querySelector('tbody'),
      insertBeforeNode = document.querySelectorAll('h3'),
      referalTr = document
        .querySelector('#customer_delivery_address_attributes_flat')
        .parentNode
        .parentNode
        .parentNode,
      referalTrWrapper = referalTr.parentNode;
  
  for (let i = oldTableData.children.length-1; i >= 0; --i) {
    oldTableData.removeChild(oldTableData.children[i]);
  }
  
  copiedTable
    .querySelector('h3')
    .textContent = 'Реферальная система';
  
  referalTr = referalTrWrapper.removeChild(referalTr);
  referalTr
    .querySelector('label')
    .textContent = 'Реферал';
  
  copiedTable
    .querySelector('tbody')
    .appendChild(referalTr);
  
  commonWrapper.insertBefore(copiedTable, getInsertBeforeNode(insertBeforeNode));
})();