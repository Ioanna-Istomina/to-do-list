function markupItem(items = []) {
  return items
    .map(
      item =>
        `<li class="item ${item.checked ? 'checked' : ''}">${
          item.value
        } <span class="close" data-id = ${item.id}>×</span></li>`
    )
    .join('');
}

export default markupItem;
