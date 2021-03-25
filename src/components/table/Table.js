import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  shouldResize,
  isCell,
  matrix,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection.js';

export class Table extends ExcelComponent {
  static className = `excel__table`;

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(25);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const cell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select(cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
}
