const CODES = {
  A: 65,
  Z: 90,
};

// function toCell(row, col) {
//   return `
//     <div class="cell" contenteditable="true" data-col="${col}" data-row="${row}"></div>
//     `;
// }

function toCell(row) {
  return function (_, col) {
    return `
      <div class="cell" contenteditable="true" data-col="${col}" data-id="${row}:${col}" data-type="cell"></div>
      `;
  };
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(index, content) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
        ${index ? index : ''}
        ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => toChar(el, index))
    .map((el, index) => toColumn(el, index))
    .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      // .map((_, col) => toCell(row, col))
      .map(toCell(row))
      .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
