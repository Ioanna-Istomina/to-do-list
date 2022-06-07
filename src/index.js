import './sass/index.scss';
import { input, addBtn, list } from './js/refs';

import markupItem from './js/markup';
import { addMarkupPage } from './js/views';
import {
  saveValueInLocalStorage,
  getValueStorage,
  localStorageSetItem,
  filterItems,
  findElementById,
} from './js/data';

addBtn.addEventListener('click', getValue);
list.addEventListener('click', checkItem);

let items = [];
start();

function getValue() {
  const value = input.value.trim();

  if (!value) {
    return;
  }
  saveValueInLocalStorage(value, items);
  start();
  input.value = '';
}

function start() {
  items = getValueStorage();
  const markup = markupItem(items);
  console.log(markup);

  addMarkupPage(markup);
}

function removeItem(ev) {
  ev.target.parentElement.remove();

  items = filterItems(items, ev.target.dataset.id);
  localStorageSetItem(items);
}

function toggleClassChecked(ev) {
  ev.target.classList.toggle('checked');

  const closeBtn = ev.target.querySelector('.close');
  const spanId = Number(closeBtn.dataset.id);
  items = getValueStorage();
  const currentItemObject = findElementById(items, spanId);

  currentItemObject.checked = ev.target.classList.contains('checked');
  localStorageSetItem(items);
}

function checkItem(ev) {
  if (ev.target.classList.contains('close')) {
    removeItem(ev);
    return;
  }

  if (ev.target.classList.contains('item')) {
    toggleClassChecked(ev);
  }
}
