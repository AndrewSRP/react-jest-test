import {Observable, of, timer} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

const list_res_mock = {
  code: '200',
  result: {
    list: [
      {
        index: 1,
        title: '소개영상',
        memo: '메모',
      }
    ]
  }
};

export class Service {
  constructor() {
  }
  initPage$() {
    return of(0).pipe(
      mergeMap(() => {
        return this.getTableByListReq$(
          this.getList$()
        );
      }),
      map((table) => {
        const page = new ListPage();
        page.table = table;
        return page
      })
    )
  }
  getList$() {
    return timer(1000).pipe(
      map(() => {
        return list_res_mock;
      })
    )
  }
  getTableByListReq$(observable$: Observable<any>) {
    return observable$.pipe(
      map((req) => (req['result'].list)),
      map((list) => (new Table(list)))
    )
  }
}

export class Table {
  constructor(public item: any[] = []) {
  }
}

export class ListPage {
  constructor(public table = new Table()) {}
}
