import { h } from './element';
import { bindClickoutside, unbindClickoutside } from './event';
import { cssPrefix } from '../config';
import { tf } from '../locale/locale';

let menuItems = [
  { key: 'copy', title: tf('contextmenu.copy'), label: 'Ctrl+C' },
  { key: 'cut', title: tf('contextmenu.cut'), label: 'Ctrl+X' },
  { key: 'paste', title: tf('contextmenu.paste'), label: 'Ctrl+V' },
  { key: 'paste-value', title: tf('contextmenu.pasteValue'), label: 'Ctrl+Shift+V' },
  { key: 'paste-format', title: tf('contextmenu.pasteFormat'), label: 'Ctrl+Alt+V' },
  { key: 'divider' },
  { key: 'insert-row', title: tf('contextmenu.insertRow') },
	//代码库修改，屏蔽
  // { key: 'insert-column', title: tf('contextmenu.insertColumn') },
  { key: 'divider' },
  { key: 'delete-row', title: tf('contextmenu.deleteRow') },
  { key: 'delete-column', title: tf('contextmenu.deleteColumn') },
  { key: 'delete-cell-text', title: tf('contextmenu.deleteCellText') },
  // { key: 'hide', title: tf('contextmenu.hide') },
	// { key: 'divider' },
	//代码库修改，屏蔽
  // { key: 'validation', title: tf('contextmenu.validation') },
  // { key: 'divider' },
  // { key: 'cell-printable', title: tf('contextmenu.cellprintable') },
  // { key: 'cell-non-printable', title: tf('contextmenu.cellnonprintable') },
  // { key: 'divider' },
  // { key: 'cell-editable', title: tf('contextmenu.celleditable') },
  // { key: 'cell-non-editable', title: tf('contextmenu.cellnoneditable') },
];

function buildMenuItem(item) {
  if (item.key === 'divider') {
    return h('div', `${cssPrefix}-item divider`);
  }
  return h('div', `${cssPrefix}-item`)
    .on('click', () => {
      this.itemClick(item.key);
      this.hide();
    })
    .children(
      item.title(),
      h('div', 'label').child(item.label || ''),
    );
}

function buildMenu() {
  return menuItems.map(it => buildMenuItem.call(this, it));
}

export default class ContextMenu {
	//代码库修改
  constructor(viewFn, isHide = false,showContextmenuAddCol,colLen) {
		//代码库修改
		if (showContextmenuAddCol) {
			let item = menuItems.find(it => it.key === 'insert-column');
			if (!item) {
				menuItems.splice(7,0,{ key: 'insert-column', title: tf('contextmenu.insertColumn') });
			}
		}
		// console.log("ContextMenu........",menuItems);
		// console.log("colLen........",colLen);
		// if (colLen <= 8) {
		// 	let index = menuItems.findIndex(it => it.key === 'delete-column');
		// 	menuItems.splice(index, 1)
		// }else{
		// 	let item = menuItems.find(it => it.key === 'delete-column');
		// 	if (!item) {
		// 		let index = menuItems.findIndex(it => it.key === 'delete-row');
		// 		menuItems.splice(index,0,{ key: 'delete-column', title: tf('contextmenu.deleteColumn') });
		// 	}
		// }
    this.menuItems = buildMenu.call(this);
		
    this.el = h('div', `${cssPrefix}-contextmenu`)
      .children(...this.menuItems)
      .hide();
    this.viewFn = viewFn;
    this.itemClick = () => {};
    this.isHide = isHide;
    this.setMode('range');
  }

  // row-col: the whole rows or the whole cols
  // range: select range
  setMode(mode) {
		//代码库修改，屏蔽
    // const hideEl = this.menuItems[11];
    // if (mode === 'row-col') {
    //   hideEl.show();
    // } else {
    //   hideEl.hide();
    // }
  }

  hide() {
    const { el } = this;
    el.hide();
    unbindClickoutside(el);
  }

  setPosition(x, y) {
    if (this.isHide) return;
    const { el } = this;
    const { width } = el.show().offset();
    const view = this.viewFn();
    const vhf = view.height / 2;
    let left = x;
    if (view.width - x <= width) {
      left -= width;
    }
    el.css('left', `${left}px`);
    if (y > vhf) {
      el.css('bottom', `${view.height - y}px`)
        .css('max-height', `${y}px`)
        .css('top', 'auto');
    } else {
      el.css('top', `${y}px`)
        .css('max-height', `${view.height - y}px`)
        .css('bottom', 'auto');
    }
    bindClickoutside(el);
  }
}
