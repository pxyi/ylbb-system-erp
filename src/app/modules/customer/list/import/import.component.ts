import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  uploadResult: any[] = [];
  uploadInfo: string;

  uploadComplate(e) {
    if (e.type === 'start') {
      this.uploadResult = [];
    }
    if (e.type === 'success') {
      this.message.create(e.file.response.code == 1000 ? 'success' : 'warning', e.file.response.info);
      if (e.file.response.code == 1000) {
        this.message.success(e.file.response.info);
      } else {
        this.uploadResult = e.file.response.result;
        this.uploadInfo = `本次上传结果（${e.file.response.info}）`;
      }
    }
  }

  save(): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

}
