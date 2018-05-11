import { Component } from '@angular/core';
import { ItemService } from './helpers/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService]
})
export class AppComponent {
  title: string = 'Tim Zodrow\'s List';
}
