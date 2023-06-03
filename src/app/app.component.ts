import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ScannerQRCodeConfig, NgxScannerQrcodeSingleService, ScannerQRCodeSelectedFiles, ScannerQRCodeResult, NgxScannerQrcodeSingleComponent } from 'ngx-scanner-qrcode-single';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#front_and_back_camera
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
    // canvasStyles: {
    //   font: '17px serif',
    //   lineWidth: 1,
    //   fillStyle: '#ff001854',
    //   strokeStyle: '#ff0018c7',
    // } as any,
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeSingleComponent;

  constructor(private qrcode: NgxScannerQrcodeSingleService) { }

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e && action && action.pause();
    console.log(e);
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onDowload(action: NgxScannerQrcodeSingleComponent) {
    action.download().subscribe(console.log, alert);
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
      console.log('origin: ',files, 'After',res)
    });
  }

  public onSelects2(files: any) {
    this.qrcode.loadFilesToScan(files, this.config).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult2 = res;
      console.log('origin: ',files, 'After',res)
    });
  }
}
