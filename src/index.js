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
import {saveValueInFirebase, getValueFromFirebase, removeIten, updateItem} from "./service/index"



addBtn.addEventListener('click', getValue);
list.addEventListener('click', checkItem);

let items = [];
start();

function getValue() {
  const value = input.value.trim();

  if (!value) {
    return;
  }
  saveValueInFirebase(value);
  start();
  input.value = '';
}

function start() {
  getValueFromFirebase('items').then(data => {
    const items = Object.values(data);
    const markup = markupItem(items);
    addMarkupPage(markup);
  }).catch(error => console.log(error))
  // items = getValueStorage();
  
  // console.log(markup);

  
}

function removeItem(ev) {
  ev.target.parentElement.remove();
removeIten(`items/${ev.target.dataset.id}`)
 
}

function toggleClassChecked(ev) {
  ev.target.classList.toggle('checked');
  const checked = ev.target.classList.contains('checked')
  const closeBtn = ev.target.querySelector('.close');
  const spanId = Number(closeBtn.dataset.id);
  updateItem(spanId, checked)
 
  
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
