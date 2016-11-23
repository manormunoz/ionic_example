import { Component } from '@angular/core';

import { TransactionsPage } from '../transactions/transactions';
import { MapPage } from '../map/map';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TransactionsPage;
  tab2Root: any = MapPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
