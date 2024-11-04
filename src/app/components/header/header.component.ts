import { Component, Input } from '@angular/core';
import { IonRouterOutlet, MenuController, NavController } from '@ionic/angular';
import { ionGoBack } from 'src/app/utilities/ionic-go-back-function';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private readonly menuController: MenuController,
    private readonly ionRouterOutlet: IonRouterOutlet,
    private readonly navController: NavController
  ) {}

  @Input({ required: true }) type: 'MENU' | 'BACK' | 'NONE' = 'NONE';

  @Input({ required: true }) headingType: 'IMAGE' | 'TEXT' = 'TEXT';

  @Input({ required: true }) heading = 'Title';

  @Input() border = true;

  @Input() defaultHref = '/home';

  goBack = ionGoBack({
    ionRouterOutlet: this.ionRouterOutlet,
    navController: this.navController,
  });

  async toggleMenu() {
    await this.menuController.toggle();
  }
}
