import { Component, OnInit } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  fileList = [];

  constructor() { }

  ngOnInit() {
  }

  fileChange(file) {

  }

  importBeforeUpload = (file: UploadFile): boolean => {
    return false;
  }

}
