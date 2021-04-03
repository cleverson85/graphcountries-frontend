import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { PageService } from 'src/app/providers/page.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  // @Output() pageChange = new EventEmitter();

  subscription = new Subscription();
  numberPages: any;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getPageCount();
  }

  getPageCount() {
    this.subscription.add(
      this.pageService.getPageCount().subscribe((result: any) => {
        this.numberPages = result;
      })
    );
  }

}
