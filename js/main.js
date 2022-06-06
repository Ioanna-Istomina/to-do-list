const input = document.querySelector("#myInput");
const addBtn = document.querySelector(".addBtn");
const list = document.querySelector("#myUL");

addBtn.addEventListener("click", getValue);
list.addEventListener("click", checkItem);

let items = [];
start();

function getValue() {
  const value = input.value.trim();

  if (!value) {
    return;
  }
  saveValueInLocalStorage(value);
  markupItem();
  input.value = "";
}

function saveValueInLocalStorage(value) {
  const item = {
    id: Date.now(),
    value,
    checked: false,
  };

  items.push(item);

  localStorage.setItem("value", JSON.stringify(items));
}

function markupItem() {
  const markup = items
    .map(
      (item) =>
        `<li class="item">${item.value} <span class="close" data-id = ${item.id}>×</span></li>`
    )
    .join("");
  list.innerHTML = markup;
}

function start() {
  items = getValueStorage();
  markupItem();
}

function getValueStorage() {
  const storageValue = JSON.parse(localStorage.getItem("value"));
  return storageValue ?? [];
}

function removeItem(ev) {
  ev.target.parentElement.remove();

  items = items.filter((item) => {
    console.log(item.id);
    console.log(ev.target.dataset.id);
    return item.id !== Number(ev.target.dataset.id);
  });
  localStorageSetItem();
}

function toggleClassChecked(ev) {
  ev.target.classList.toggle("checked");

  const closeBtn = ev.target.querySelector(".close");
  const spanId = Number(closeBtn.dataset.id);
  items = getValueStorage();
  const currentItemObject = items.find((el) => el.id === spanId);

  currentItemObject.checked = ev.target.classList.contains("checked");
  localStorageSetItem();
}

function checkItem(ev) {
  if (ev.target.classList.contains("close")) {
    removeItem(ev);
    return;
  }

  if (ev.target.classList.contains("item")) {
    toggleClassChecked(ev);
  }
}

function localStorageSetItem() {
  localStorage.setItem("value", JSON.stringify(items));
}
