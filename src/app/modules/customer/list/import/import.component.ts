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

  uploadComplate(e) {
    if (e.type === 'success') {
      this.message.create(e.file.response.code == 1000 ? 'success' : 'warning', e.file.response.info);
    }
  }

  save(): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

}
