import Item from './item';
import Icon from '../icon';

export default class ToggleItem extends Item {
  element() {
    const { tag } = this;
		let childObj = null;
		if (tag === 'sumlandscape' || tag === "sumportrait") {
			childObj = tag === 'sumlandscape'?"横向求和":"纵向求和";
		}else{
			childObj = new Icon(tag);
		}
    return super.element()
      .child(childObj)
      .on('click', () => this.click());
  }

  click() {
    this.change(this.tag, this.toggle());
  }

  setState(active) {
    this.el.active(active);
  }

  toggle() {
    return this.el.toggle();
  }

  active() {
    return this.el.hasClass('active');
  }
}
