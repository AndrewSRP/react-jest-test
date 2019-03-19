export class DeviceManagerPage {
  deviceModel: DeviceModel;
  appVersionList: APK[] = [];
  historyList: any[] = [];
  constructor(deviceModel: DeviceModel) {
    this.deviceModel = deviceModel;
  }
  setHistoryList(historyList: any[]) {
    this.historyList = historyList;
  }
  updateAppVersionList(appVersionList: APK[]) {
    this.appVersionList = appVersionList;
  }
  selectAppVersion(appVersion: APK) {
    this.deviceModel.apk = appVersion;
  }
  onClickButton(callback: Function) {
    if(callback) {
      callback(this.deviceModel);
    }
  }
  onClickMappingUnsubscribeButton(callback: Function) {
    if(callback) {
      callback(this.deviceModel);
    }
  }
}

export class DeviceModel {
  id: number;
  _serialNumber: string;
  _OSVersion: string;
  apk: APK | null = null;
  status = {
    use: '사용',
    date: '1980-01-01 10:00:00'
  };
  date = '1980-01-01 10:00:00';
  hospital = {
    id: 0,
    name: '굿닥 내과'
  };
  set serialNumber(text) {} // 제거해도 된다.
  get serialNumber() {
    return this._serialNumber;
  }
  set OSVersion(text) {} // 제거해도 된다.
  get OSVersion() {
    return this._OSVersion;
  }
  constructor(
    id: number,
    serialNumber: string,
    OSVersion: string,
    hospital: Hospital
  ) {
    this._serialNumber = serialNumber;
    this._OSVersion = OSVersion;
  }
  unsubscribeMapping(callback: Function) {
    this.status.use = '미사용';
    callback();
  }
}

export class Hospital {
  constructor(
    public id: number,
    public name: string
  ) {

  }
}

export class APK {
  constructor(
    public id: number,
    public name: string = '3.0.0') {
  }
}
