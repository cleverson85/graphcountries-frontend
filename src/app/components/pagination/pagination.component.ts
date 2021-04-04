import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { PageService } from 'src/app/providers/page.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChange = new EventEmitter();

  subscription = new Subscription();
  numberPages: any;
  config: any;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.getPageCount();

    this.config = {
      itemsPerPage: 9,
      currentPage: 1,
      totalItems: this.numberPages,
    };
  }

  getPageCount() {
    this.subscription.add(
      this.pageService.page$.subscribe((result: any) => {
        this.numberPages = result;
      })
    );
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.pageChange.emit(event - 1);
  }
}
