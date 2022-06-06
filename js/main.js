const input = document.querySelector("#myInput");
const addBtn = document.querySelector(".addBtn");
const list = document.querySelector("#myUL");

addBtn.addEventListener("click", getValue);
list.addEventListener("click", removeItem);

let items = [];
getValueStorage();

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
        `<li>${item.value} <span class="close" data-id = ${item.id}>×</span></li>`
    )
    .join("");
  list.innerHTML = markup;
}

function getValueStorage() {
  const storageValue = JSON.parse(localStorage.getItem("value"));

  if (!storageValue) {
    return;
  }
  items = storageValue;

  markupItem();
}

function removeItem(ev) {
  if (ev.target.classList.contains("close")) {
    ev.target.parentElement.remove();

    items = items.filter((item) => item.id !== Number(ev.target.dataset.id));
    localStorage.setItem("value", JSON.stringify(items));
  }
}
