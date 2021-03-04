import ToggleItem from './toggle_item';

export default class SumLandscape extends ToggleItem {
  constructor() {
    super('sumlandscape');
  }
	setState(active,disabled) {
    this.el.active(active).disabled(disabled);
  }
}

// import DropdownItem from './dropdown_item';
// import DropdownSum from '../dropdown_sum';

// export default class Sum extends DropdownItem {
//   constructor() {
//     super('sum');
//   }

// 	getValue(it) {
//     return it.key;
//   }
// 	setState(disabled) {
//     this.el.disabled(disabled);
//   }

//   dropdown() {
//     return new DropdownSum();
//   }
// }