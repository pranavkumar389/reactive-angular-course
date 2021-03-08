import { BehaviorSubject, from, Observable, of } from "rxjs";
import { Injectable } from '@angular/core';
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.startLoading()),
        concatMap(() => obs$),
        finalize(() => this.stopLoading())
      )
  }

  startLoading(): void {
    this.loadingSubject.next(true);
  }

  stopLoading(): void {
    this.loadingSubject.next(false);
  }

}