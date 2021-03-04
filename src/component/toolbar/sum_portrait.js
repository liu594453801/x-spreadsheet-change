import ToggleItem from './toggle_item';

export default class SumPortrait extends ToggleItem {
  constructor() {
    super('sumportrait');
  }
	setState(active,disabled) {
    this.el.active(active).disabled(disabled);
  }
}
