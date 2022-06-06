function saveValueInLocalStorage(value = '', items = []) {
  const item = {
    id: Date.now(),
    value,
    checked: false,
  };

  items.push(item);

  localStorage.setItem('value', JSON.stringify(items));
}

function getValueStorage() {
  const storageValue = JSON.parse(localStorage.getItem('value'));
  return storageValue ?? [];
}

function localStorageSetItem(items = []) {
  localStorage.setItem('value', JSON.stringify(items));
}

function filterItems(items, id) {
  return items.filter(item => item.id !== Number(id));
}

function findElementById(items, id) {
  return items.find(el => el.id === id);
}

export {
  saveValueInLocalStorage,
  getValueStorage,
  localStorageSetItem,
  filterItems,
  findElementById,
};
