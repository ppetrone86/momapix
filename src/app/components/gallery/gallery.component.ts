import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {SearchService} from "../../services/search.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy{

  items: any[] = []
  private itemsSubscription?: Subscription

  constructor(
    public authService: AuthService,
    private searchService: SearchService
  ) {

  }

  ngOnInit() {
    this.itemsSubscription = this.searchService.items$.subscribe(items => {
      this.items = items
    })
  }

  ngOnDestroy() {
    this.itemsSubscription?.unsubscribe()
  }
}
