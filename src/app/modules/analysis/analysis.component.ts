import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  nickName = new FormControl('tom');
  formModel: FormGroup;
  selectindex: any;
  AllList: any;
  findList: any;
  findindex: any;
  menu: any;
  pageId: string = "14";
  formList = {};
  dataSet = [];
  ListHeader: any;
  ListContent: any;
  formData: any = {
    "datePickerList": [],
    "selectList": [],
    "textFieldList": [],
    "writeableSelectList": []
  };
  constructor(

    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,


  ) {

    this.getform(this.pageId);
    this.formModel = new FormGroup({

    });
  }
  changefind() {
    let index = this.selectindex - 1;
    this.findList = this.menu[index].children;
  }
  subData() {
    let params = JSON.parse(JSON.stringify(this.formModel.value));
    console.log(params);

    if (this.formData.datePickerList) {
      this.formData.datePickerList.map(res => {
        params[res.fieldName] = this.format.transform(params[res.fieldName], 'yyyy-MM-dd');
      })
    }

    params.reportId = this.pageId;
    for (let i in params) {
      if (params[i] == null || params[i] == '') {
        delete params[i];
      }
    }
    this.http.post('/report/query', { paramJson: JSON.stringify(params) }, false).then(res => {
      this.ListHeader = res.result.header;
      this.ListContent = res.result.content;
    });
  }
  elder(index) {
    let reportId = index == '0' ? '14' : (index == '1' ? '2' : (index == '2' ? '3' : (index == '3' ? '8' : '42')));
    this.pageId = reportId;
    this.getform(reportId);
  }
  getform(reportId) {
    this.http.post('/report/buildQueryPage', { paramJson: JSON.stringify({ reportId: reportId }) }, false).then(res => {
      this.formData = res.result;

      if (this.formData.selectList) {

        this.formData.selectList.map((item, index) => {
          if (item.dataSource) {
            let dataSource = JSON.stringify(item.dataSource);
            dataSource = dataSource.substring(1, dataSource.length - 1);
            item.dataSource = dataSource.split(',');
            item.dataSource.map((items, indexs) => {
              let str = items.split(':')[0];
              let str1 = items.split(':')[1];
              str = str.substring(1, str.length - 1);
              str1 = str1.substring(1, str1.length - 1);
              let jsons:any = {};
              jsons.key = str;
              jsons.name = str1;
              this.formData.selectList[index].dataSource[indexs] = jsons;
            })
          }
        })
      }
      console.log(this.formData);

      if (this.formData.datePickerList) {
        this.formData.datePickerList.map(res => {
          this.formModel.addControl(res.fieldName, new FormControl())
        })
      }

      if (this.formData.selectList) {
        this.formData.selectList.map(res => {
          this.formModel.addControl(res.fieldName, new FormControl())
        })
      }
      if (this.formData.textFieldList) {
        this.formData.textFieldList.map(res => {
          this.formModel.addControl(res.fieldName, new FormControl())
        })
      }
    });
  }
  ngOnInit() {

  }

}
