export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el instanceof DOM === true
  select($el) {
    this.clear();
    $el.addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.name));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }
}
