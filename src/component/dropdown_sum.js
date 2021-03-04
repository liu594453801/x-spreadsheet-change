import Dropdown from './dropdown';
import { h } from './element';
import { baseSums } from '../core/sum';
import { cssPrefix } from '../config';

export default class DropdownSum extends Dropdown {
  constructor() {
    let nsums = baseSums;
    nsums = nsums.map((it) => {
      const item = h('div', `${cssPrefix}-item`);
      if (it.key === 'divider') {
        item.addClass('divider');
      } else {
        item.child(it.title())
          .on('click', () => {
						console.log("it.title()...",it);
            this.setTitle(it.key);
            this.change(it);
          });
        if (it.label) item.child(h('div', 'label').html(it.label));
      }
      return item;
    });
    super('纵向求和', '220px', true, 'bottom-left', ...nsums);
  }

  setTitle(key) {
    for (let i = 0; i < baseSums.length; i += 1) {
      if (baseSums[i].key === key) {
        this.title.html(baseSums[i].title());
      }
    }
    this.hide();
  }
}
