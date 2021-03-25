import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom.js';

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

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const type = $resizer.data.resize;
      let value;

      $resizer.css({ opacity: 1, bottom: '-5000px' });

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({ right: -delta + 'px' });
        } else {
          // const delta = e.pageY - coords.bottom;
          // const value = coords.height + delta;
          // $parent.css({ height: value + 'px' });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;

        $parent.css({ width: value + 'px' });
        this.$root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => (el.style.width = value + 'px'));

        $resizer.css({ opacity: 0, bottom: 0, right: 0 });
      };
    }
  }
}

//182 ms  Scripting
// 1103 ms  Rendering
// 287 ms  Painting
// 287 ms  System
// 7671 ms  Idle
// 9529 ms  Total

// 131 ms  Scripting
// 939 ms  Rendering
// 237 ms  Painting
// 314 ms  System
// 4559 ms  Idle
// 6180 ms  Total
