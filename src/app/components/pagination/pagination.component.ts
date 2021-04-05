import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Environment } from 'src/app/environment.service';

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
  totalPages: number;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.configurePages();

    this.config = {
      itemsPerPage: Environment.settings.itensPerPage,
      currentPage: 1,
      totalItems: this.numberPages,
    };
  }

  configurePages() {
    this.subscription.add(
      this.pageService.page$.subscribe((result: any) => {
        this.numberPages = result;
        this.totalPages = Math.round(
          this.numberPages?.length / Environment.settings.itensPerPage
        );
      })
    );
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.pageChange.emit(event - 1);
  }
}
