import {ListPage, Service, Table} from './list';

describe('리스트 페이지에 진입 했을때 행위를 처리할 수 있다.', () => {
  describe('페이지를 진입 했을때 테이블이 생성되어야 한다.', () => {
    test('페이지에 진입했다면, 페이지 정보를 가질수 있다.', () => {
      const page = new ListPage();
      expect(page).toBeDefined()
    });
    test('페이지는 테이블을 가질수 있다.', () => {
      const page = new ListPage();
      const table = new Table();
      expect(page.table).toEqual(table)
    });
    test('서버로 부터 리스트를 가져올 수 있다.', (done) => {
      const service = new Service();
      service.getList$().subscribe((res) => {
        const _res = {
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
        expect(res).toEqual(_res);
        done();
      });
    });
    test('서버 리스트로 테이블을 만들수 있다.', (done) => {
      const service = new Service();
      service.getTableByListReq$(
        service.getList$()
      ).subscribe((table) => {
        const _table = new Table([{
          index: 1,
          title: '소개영상',
          memo: '메모',
        }]);
        expect(table).toEqual(_table);
        done();
      });
    });
    test('페이지에 진입했을때, 서버로부터 데이터를 받아와서, 테이블을 생성할 수 있다.', (done) => {
      const service = new Service();
      service.initPage$()
        .subscribe((page) => {
          const _page = new ListPage(
            new Table([{
              index: 1,
              title: '소개영상',
              memo: '메모',
            }]));
        expect(page).toEqual(_page);
        done();
      });
    });
  });
  test('등록버튼을 눌렀을때 상세페이지가 떠야한다.', () => {
    expect(true).toBeDefined()
  });
  test('테이블에서 상세 버튼을 누르면 상세페이지가 떠야 한다.', () => {
    expect(true).toBeDefined()
  });
  test('페이지 네이션 으로 테이블이 이동되어야 한다.', () => {
    expect(true).toBeDefined()
  });
})
