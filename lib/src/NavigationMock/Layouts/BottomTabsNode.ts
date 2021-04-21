import _ from 'lodash';
import { Options } from '../../index';
import LayoutStore from '../LayoutStore';
import ParentNode from './ParentNode';

export default class BottomTabsNode extends ParentNode {
  selectedIndex: number = 0;
  constructor(layout: any, parentNode?: ParentNode) {
    super(layout, 'BottomTabs', parentNode);
  }

  mergeOptions(options: Options) {
    super.mergeOptions(options);
    if (options.bottomTabs?.currentTabIndex) {
      this.selectedIndex = options.bottomTabs?.currentTabIndex;
      LayoutStore.setters.selectTabIndex(this, this.selectedIndex);
    }
    if (options.bottomTabs?.currentTabId) {
      const index = _.findIndex(
        this.children,
        (child) => child.nodeId === options?.bottomTabs?.currentTabId
      );
      if (index !== -1) this.selectedIndex = index;
      LayoutStore.setters.selectTabIndex(this, this.selectedIndex);
    }
  }

  getVisibleLayout() {
    return this.children[this.selectedIndex].getVisibleLayout();
  }
}
