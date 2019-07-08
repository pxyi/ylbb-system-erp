import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-intelligent',
  templateUrl: './intelligent.component.html',
  styleUrls: ['./intelligent.component.scss']
})
export class IntelligentComponent implements OnInit {
  nickName = new FormControl('tom');
  checkList: any = [];
  formModel: FormGroup;
  SyllabusAll: any = [];
  schoolList: any = [];
  ScourList: any = [];
  startDate: any = '';
  isVisible = false;
  subLoading = false;
  form: any = {
    syllabusName: '',
    startDate: '',
    lessonPeriod: '',
    list: []
  };
  weekList: any = [
    {
      name: '星期一',
      booles: false,
      time: ''
    },
    {
      name: '星期二',
      booles: false,
      time: ''
    },
    {
      name: '星期三',
      booles: false,
      time: ''
    },
    {
      name: '星期四',
      booles: false,
      time: ''
    },
    {
      name: '星期五',
      booles: false,
      time: ''
    },
    {
      name: '星期六',
      booles: false,
      time: ''
    },
    {
      name: '星期日',
      booles: false,
      time: ''
    },
  ];
  constructor(

    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,


  ) {

    this.getData();
    this.formModel = new FormGroup({});
    this.formModel.addControl("syllabusId", new FormControl());
    this.formModel.addControl("startDate", new FormControl());
    this.formModel.addControl("lessonPeriod", new FormControl());


  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  addListTime(index, indexs) {
    let jsons = {
      employeeName: '请选择教室',
      scourId: '',
      roomId: ''
    };
    this.form.list[index].list.push(jsons);
  }
  isTime() {

    this.form.list = [];
    this.weekList.map(item => {
      item.booles = false;
    })

    if (this.startDate != "" && this.startDate != null) {
      this.startDate = this.format.transform(this.startDate, 'yyyy-MM-dd');
      let mydate = new Date(this.startDate);
      let myddy = mydate.getDay();//获取存储当前日期
      let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let weektoday = weekday[myddy];
      let arr = [];
      let indexx = 0;
      this.weekList.map((item, indexs) => {
        if (item.name == weektoday) {
          indexx = indexs;
        }
      })
      this.weekList.map((item, indexs) => {
        if (indexs < indexx) {
          item.time = getNextDay(this.startDate, (6 - indexx) + indexs + 1);
        } else if (indexs > indexx) {
          item.time = getNextDay(this.startDate, indexs - indexx);
        } else {
          item.time = this.startDate;
        }
        arr.push(item);
      })
      this.weekList = arr;
      console.log(arr);
    }
    //指定日期往后
    function getNextDay(d, index) {
      d = new Date(d);
      d = +d + 1000 * 60 * 60 * 24 * index;
      d = new Date(d);
      let year = d.getFullYear();
      let mon = d.getMonth() + 1;
      let day = d.getDate();
      let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
      return s;
    }
  }
  removeListTime(index, indexs) {
    if (this.form.list[index].list.length > 1) {
      this.form.list[index].list.splice(indexs, 1);
    }
  }
  weekChange(indexs, name) {
    let that = this;
    if (this.form.syllabusName == "") {
      this.message.info('请选择课程名称');
      setTimeout(function () {
        that.weekList[indexs].booles = false;
      }, 300)
      return false;
    }
    if (this.form.lessonPeriod == "") {
      this.message.info('请输入排课课时');
      setTimeout(function () {
        that.weekList[indexs].booles = false;
      }, 300)
      return false;
    }
    if (this.startDate == "") {
      this.message.info('请选择开始时间');
      setTimeout(function () {
        that.weekList[indexs].booles = false;
      }, 300)
      return false;
    }
    if (this.weekList[indexs].booles) {
      let jsons: any = {};
      jsons.week = this.weekList[indexs].name;
      jsons.syllabusName = this.form.syllabusName;
      jsons.currentDate = this.weekList[indexs].time;
      jsons.lessonPeriod = Number(this.form.lessonPeriod);
      jsons.startDate = this.startDate;
      jsons.list = [{
        employeeName: '请选择教室',
        scourId: '',
        roomId: ''
      }];
      this.form.list.splice(indexs, 0, jsons);
    } else {
      let arr = new Array();
      this.form.list.map((item, index) => {
        if (name != item.week) {
          arr.push(item);
        }

      })
      this.form.list = arr;

    }
  }
  getData() {
    let that = this;
    that.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/scheduling/selectSyllabusAll', {}, false).then(res => {
      this.SyllabusAll = res.result.list;
    });
    that.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/scheduling/selectSchedulingAll', {}, false).then(res => {
      this.schoolList = res.result.list;
    });
    that.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/intelligent/selectScour', {}, false).then(res => {
      this.ScourList = res.result.list;
    });
  }
  selectschool(index, indexs) {
    this.schoolList.map(item => {
      if (this.form.list[index].list[indexs].roomId == item.id) {
        this.form.list[index].list[indexs].employeeName = item.employeeName;
        this.form.list[index].list[indexs].employeeId = item.employeeId;
      }
    })

  }
  submits() {
    let that = this;
    let paramJson = JSON.stringify(this.form.list);
    let isscourId = true;
    let isroomId = true;
    let isrepeat = true;
    if (!this.form.list.length){
      this.message.info('最少要选择一节课哦~');
      return false;
    }
    this.form.list.map(item => {
      item.list.map((items,index) => {
        if (items.scourId == "") {
          isscourId = false;
        } else {
          if (items.roomId == "") {

            isroomId = false;
          }
        }
      //循环判断时段和教室不能有重复数据
        item.list.map( (itemxs,indexs)=>{
          if (items.scourId == itemxs.scourId && items.roomId == itemxs.roomId &&index!=indexs ){
            isrepeat = false;
          }
        })


      })
    })
    if (!isscourId) {
      this.message.info('时段不能为空');
      return false;
    }
    if (!isroomId) {
      this.message.info('教室不能为空');
      return false;
    };
    if (!isrepeat) {
      this.message.info('同一时段同一教室不能有两节课');
      return false;
    }
    this.subLoading = true;
    this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/checkReserveRecord', { paramJson, lessonPeriod: Number(this.form.lessonPeriod) }, false).then(res => {
      if (typeof res.result.list == "undefined") {
        this.http.post('http://qnewbss.beibeiyue.cn/schedule/schedule/yeqs/curriculum/saveReserveRecord', { paramJson, residue: res.result.residue, sundays: res.result.sundays }, false).then(res => {
          this.subLoading = false;
          this.message.create('success', '添加成功！');
          this.form = {
            syllabusName: '',
            startDate: '',
            lessonPeriod: '',
            list: []
          };
          this.startDate = "";
          this.weekList.map(item => {
            item.booles = false;
          })
        });
      } else {
        this.subLoading = false;
        let alertInfo = "";
        that.checkList = res.result.list;
        that.isVisible = true;
      }
    });
  }
  ngOnInit() {

  }
}
