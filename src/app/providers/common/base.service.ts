import { defer, Observable, Subscription, timer } from 'rxjs';
import { Injector, OnDestroy, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../spinner.service';
import ApiBase from './apiBase.service';

export function prepare<T>(
  callback: () => void
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
}

@Injectable()
export abstract class BaseService implements OnDestroy {
  ngxSpinner: NgxSpinnerService;
  spinner: SpinnerService;
  subscription = new Subscription();

  constructor(injector: Injector) {
    this.ngxSpinner = injector.get(NgxSpinnerService);
    this.spinner = injector.get(SpinnerService);
  }

  showLoading(text: string = 'Carregando...') {
    this.subscription.add(
      timer(1000).subscribe((_) => this.spinner.setTextLoading(text))
    );
    this.ngxSpinner.show();
  }

  hideLoading() {
    this.ngxSpinner.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
