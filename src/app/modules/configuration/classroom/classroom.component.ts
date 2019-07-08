import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.less']
})
export class ClassroomComponent implements OnInit {
  classroomList: any = [];
  name: any = '';
  TeacherList: any = [];
  addclassroom: boolean = false;
  roomName: any;
  roomCode: any;
  employeeId: any;
  galleryful: any;
  roomId: any = '';
  delectclassroom: boolean = false;
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,
  ) {
    this.selectTeacher();
    this.queryDataList();
  }
  queryDataList() {
    let paramJson = JSON.stringify({
      name: this.name
    })
    this.http.post('/yeqs/scheduling/selectClassRoom', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.classroomList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  selectTeacher() {
    this.http.post('/yeqs/scheduling/selectEmployee', { name: this.name }, false).then(res => {
      if (res.code == 1000) {
        this.TeacherList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  addClassroomfun() {
    this.addclassroom = true;
    this.roomId = '';
    this.employeeId = null;

  }
  closeaddclassroom() {
    this.addclassroom = false;
    this.roomName = '';
    this.roomCode = '';
    this.employeeId = '';
    this.galleryful = '';
  }
  //添加教室
  isaddclassroom() {
    if (!this.roomName) {
      this.message.create('error', '教室名称不能为空');
      return false;
    }
    if (!this.roomCode) {
      this.message.create('error', '教室编号不能为空');
      return false;
    }
    if (!this.employeeId) {
      this.message.create('error', '请选择主教老师');
      return false;
    }
    if (!this.galleryful) {
      this.message.create('error', '请输入容纳人数');
      return false;
    }
    if (!this.roomId) {
      let paramJson: any = JSON.stringify({
        roomName: this.roomName,
        roomCode: this.roomCode,
        employeeId: this.employeeId,
        galleryful: this.galleryful,
      });

      this.http.post('/yeqs/scheduling/insertScheduling', { paramJson }, false).then(res => {
        if (res.code == 1000) {
          this.message.create('success', '添加成功！');
          this.addclassroom = false;
          this.queryDataList();
          this.roomName = '';
          this.roomCode = '';
          this.employeeId = '';
          this.galleryful = '';
        } else {
          this.message.create('error', res.info);
        }
      });
    } else {
      let paramJson: any = JSON.stringify({
        roomName: this.roomName,
        roomCode: this.roomCode,
        employeeId: this.employeeId,
        galleryful: this.galleryful,
        id: this.roomId
      });

      this.http.post('/yeqs/scheduling/updateScheduling', { paramJson }, false).then(res => {
        if (res.code == 1000) {
          this.message.create('success', '修改成功！');
          this.addclassroom = false;
          this.queryDataList();
          this.roomName = '';
          this.roomCode = '';
          this.employeeId = '';
          this.galleryful = '';
        } else {
          this.message.create('error', res.info);
        }
      });
    }
  }
  //修改教室
  Editingclassroom(id) {
    this.addclassroom = true;
    this.http.post('/yeqs/scheduling/selectScheduling', { id: id }, false).then(res => {
      if (res.code == 1000) {
        this.roomName = res.result.list.roomName;
        this.roomCode = res.result.list.roomCode;
        this.employeeId = res.result.list.employeeId;
        this.galleryful = res.result.list.galleryful;
        this.roomId = res.result.list.id;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  //删除教室
  removeclassroom(id) {
    this.delectclassroom = true;
    this.roomId = id;
  }
  closedelectclassroom() {
    this.delectclassroom = false;
  }
  isdelectclassroom() {

    this.http.post('/yeqs/scheduling/deleteScheduling', { id: this.roomId }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '删除成功！');
        this.delectclassroom = false;
        this.queryDataList();
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  ngOnInit() {
  }

}
