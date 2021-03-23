import { ExcelComponent } from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = `excel__table`;
  toHTML() {
    return `
    <div class="row">
    <div class="row-info"></div>
    <div class="row-data">
      <div class="column">A</div>
      <div class="column">B</div>
      <div class="column">C</div>
    </div>
  </div>
  <div class="row">
    <div class="row-info">1</div>
    <div class="row-data">
      <div class="cell selected" contenteditable="true">1assad</div>
      <div class="cell" contenteditable="true">2sdsd</div>
      <div class="cell" contenteditable="true">3asdas</div>
    </div>
  </div>
    `;
  }
}
