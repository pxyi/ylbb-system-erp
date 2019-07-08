import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-currcategory',
  templateUrl: './currcategory.component.html',
  styleUrls: ['./currcategory.component.scss']
})
export class CurrcategoryComponent implements OnInit {
  private domain: string = environment.domainYeqs;
  typeList: any = [];
  typeName: any = [];
  openRemoveType: any = false;
  openaddType: any = false;
  Typestatus: any = 1;
  TypeId: any = "";
  addstatus: any = "";
  installName: any = "";
  openTit: any = "新增课程类别";
  changeId: any = 0;
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,
  ) { 
    this.selectTypeListQuery();
  }
  //查询课程类型、类别
  selectTypeListQuery() {
    this.http.post('/yeqs/intelligent/selectLesson', { status: '1', name: this.typeName }, false).then(res => {
      if (res.code == 1000) {
        this.typeList = res.result.list;
      }
    });
  }
  removeType(index, id) {
    this.Typestatus = index;
    this.TypeId = id;
    this.openRemoveType = true;
  }
  closeRemoveType() {
    this.openRemoveType = false;
  }

  isRemoveType() {
    this.http.post('/yeqs/intelligent/delectLesson', { status: this.Typestatus, id: this.TypeId }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '删除成功！');
        this.selectTypeListQuery();
        this.openRemoveType = false;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  addcourseType(type) {
    this.addstatus = type;
    this.openaddType = true;
    this.openTit = '新增课程类别';
   
  }
  closeaddType() {
    this.openaddType = false;
    this.installName = null;
  }
  isaddType() {
    if (this.installName == "") {
      this.message.create('error', '请输入课程类别！');
      return false;
    }
    if (this.changeId == "") {
      this.http.post('/yeqs/intelligent/insertLesson', { status: this.Typestatus, name: this.installName }, false).then(res => {
        if (res.code == 1000) {
          this.message.create('success', '添加成功！');
          this.selectTypeListQuery();
          this.openaddType = false;
          this.installName = "";
        } else {
          this.message.create('error', res.info);
        }
      });
    } else {
      this.http.post('/yeqs/intelligent/updateLesson', { status: this.Typestatus, name: this.installName, id: this.changeId }, false).then(res => {
        if (res.code == 1000) {
          this.message.create('success', '修改成功！');
          this.selectTypeListQuery();
          this.openaddType = false;
          this.installName = "";
          this.changeId = '';
        } else {
          this.message.create('error', res.info);
        }
      });
    }
  }
  editType(type, id) {
    this.addstatus = type;
    this.openaddType = true;
    this.openTit = '编辑课程类别';
    this.http.post('/yeqs/intelligent/selectLessonType', { status: this.addstatus, id: id }, false).then(res => {
      if (res.code == 1000) {
        this.installName = res.result.list.name;
        this.changeId = res.result.list.id;
      } else {
        this.message.create('error', res.info);
      }
    });

  }
  ngOnInit() {
  }

}
