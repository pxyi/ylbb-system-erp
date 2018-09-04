import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  fileList = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }


  importBeforeUpload = (file: UploadFile): boolean => {
    this.http.put('/member/uploadExcel', { excelFile: file }).subscribe(res => console.log(res))
    console.log(file);
    return false;
  }

}
