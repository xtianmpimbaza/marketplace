import {Component, OnInit} from '@angular/core';
import {MAINPAGE_SIDEROUTES, MenuType} from './main-page.metadata';
import {Location} from '@angular/common';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public menuItems: any[];

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.menuItems = MAINPAGE_SIDEROUTES.filter(x => x.menuType === MenuType.LEFT);
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(11);
    }
    for (let item = 0; item < this.menuItems.length; item++) {
      if (this.menuItems[item].path === titlee) {
        return this.menuItems[item].title;
      }
    }
    return 'Dashboard';
  }

}
