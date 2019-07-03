import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() color: string = "#59407F";
  // 选择颜色以后调用父组件中的方法，将数据传递出去，方法
  @Output() sentColor = new EventEmitter();
  private domain = environment.domainYeqs;
  courseList:any = [];
  iscourse:any = '';
  editor:any = '新增课程';
  addcourse:any = false;
  addcourseStatus:any = 0;
  addcourseTypeId:any = '';
  addname:any = '';
  addcharging:any = '';
  addnumber:any = '';
  addlessonTypeId:any = '';
  courseId:any = '';
  removeclassContent:any = false;
  typefaceColour: string;
  modeList:any = [
    {
      name:'按课时收费'
    }
  ];
  colorList:any = [{
    color: '#59407F',
    bgcolor: 'rgba(102,0,255,.2)'
  },{
    color: '#496A39',
    bgcolor: 'rgba(75,229,0,.2)'
  },{
    color:'#2C6799',
    bgcolor: 'rgba(0,142,255,.2)'
  },{
    color:'#9D5900',
    bgcolor: 'rgba(255,156,0,.2)'
  },{
    color: '#993C3D',
    bgcolor: 'rgba(246,0,0,.2)'
  },{
    color:'#3A6848',
    bgcolor: 'rgba(0,231,103,.2)'

  }];
  openType:any = 0;
  courseIdblon = false;
  CoursecategoryList:any = [];
  ClasstypesList:any = [];
  CoursenameList:any = [];
  Chargingmode:any = []; 
  name:any = '';
  courseName:any = '';
  lessonName:any = '';
  courseStatus:any = '';
  coursesName:any = '';
  StateCourseList:any = [
    {
      name:'启用',
      value:0
    },{
      name:'停用',
      value:1
    }
  ];
  removeanddisable:any = false;
  removeanddisableTit:any = '确认删除';
  removeanddisableContent:any = '确认删除该课程？';
  Listmain:any = [];
  classContent:any = false; 
  ListmainId:any = '';
  addclassContent:any = false;
  period:any = '';
  curriculum:any = '';
  content:any = '';
  classListid:any = '';
  modifyId:any = '';
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,
  ) {
    this.selectDataArr();
    this.querySelect();
   }
  selectDataArr(){
   //查询课程类别 
    this.http.post(this.domain + '/intelligent/selectLessonAll', { status: '1' }, false).then(res => {
      if (res.code == 1000) {
        this.CoursecategoryList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
    //查询课程类型
    this.http.post(this.domain + '/intelligent/selectLessonAll', { status: '0' }, false).then(res => {
      if (res.code == 1000) {
        this.ClasstypesList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
    //查询课程名称
    this.http.post(this.domain + '/scheduling/selectSyllabusAll', {  }, false).then(res => {
      if (res.code == 1000) {
        this.CoursenameList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });     
  }
  querySelect(){
    let paramJson: any = JSON.stringify({
      name: this.name,
      courseName: this.courseName,
      lessonName: this.lessonName,
      courseStatus: this.courseStatus,
   
    });
    this.http.post(this.domain + '/scheduling/selectCondition', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.courseList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });        
  }
  // 新增课程
  addcoursefun(){
    this.editor = '新增课程';
    this.addcourse = true;
    this.courseIdblon = false;
  }
  closeaddcourse(){
    this.addcourse = false; 
    this.addname = "";
    this.addcourseTypeId = "";
    this.addlessonTypeId = "";
    this.addcourseStatus = 0;
    this.addnumber = "";
    this.addcharging = "";
    this.courseId = '';
    this.color = null;
  }
  isaddcourse(){
    if (!this.addcourseTypeId) {
      this.message.create('error', '请选择课程类别！');
      return false;
    }    
    if (!this.addname ){
      this.message.create('error', '请输入课程名称！');
      return false;
    }
    if (!this.addlessonTypeId) {
      this.message.create('error', '请选择课程类型！');
      return false;
    }
    if (!this.addnumber) {
      this.message.create('error', '请输入每课时耗卡！');
      return false;
    }    
    if (!this.addcharging) {
      this.message.create('error', '请选择收费模式！');
      return false;
    }
    if (!this.color) {
      this.message.create('error', '请选择课程颜色');
      return false;
    }    
    this.colorList.map(item=>{
      if(this.color == item.color){
        this.typefaceColour = item.bgcolor;
      }
    })
    if(!this.courseId){
        let paramJson: any = JSON.stringify({
          name: this.addname,
          courseTypeId: this.addcourseTypeId,
          lessonTypeId: this.addlessonTypeId,
          courseStatus: this.addcourseStatus,
          number: this.addnumber,
          charging: this.addcharging,
          colour:  this.color,
          typefaceColour: this.typefaceColour
        });  
        this.http.post(this.domain + '/scheduling/insertSyllabus', { paramJson }, false).then(res => {
          if (res.code == 1000) {
            this.addcourse = false; 
            this.message.create('success', '添加成功！');
            this.querySelect();
            this.selectDataArr();
            this.addname = "";
            this.addcourseTypeId = "";
            this.addlessonTypeId = "";
            this.addcourseStatus = 0;
            this.addnumber = "";
            this.addcharging = "";
            this.courseId = '';
            this.color = null;
          } else {
            this.message.create('error', res.info);
           
          }
        });   
    }else{
      let paramJson: any = JSON.stringify({
        lessonTypeId: this.addlessonTypeId,
        courseStatus: this.addcourseStatus,
        number: this.addnumber,
        id: this.courseId,
        colour:  this.color,
        typefaceColour: this.typefaceColour
      });
      this.http.post(this.domain + '/scheduling/updateSyllabus', { paramJson }, false).then(res => {
        if (res.code == 1000) {
          this.addcourse = false;
          this.message.create('success', '修改成功！');
          this.querySelect();
          this.selectDataArr();
          this.addname = "";
          this.addcourseTypeId = "";
          this.addlessonTypeId = "";
          this.addcourseStatus = 0;
          this.addnumber = "";
          this.addcharging = "";
          this.courseId = '';
          this.color = null;
        } else {
          this.message.create('error', res.info);
         
        }
      });
    }  
  };
  EditingCourse(id){
    this.courseIdblon = true;
    this.editor = '编辑课程';
    this.addcourse = true;
    this.courseId = id;
    this.http.post(this.domain + '/scheduling/selectSyllabus', { id:id }, false).then(res => {
      if (res.code == 1000) {
        this.addname = res.result.list.name;
        this.addcourseTypeId = res.result.list.courseTypeId;
        this.addlessonTypeId = res.result.list.lessonTypeId;
        this.addcourseStatus = res.result.list.courseStatus;
        this.addnumber = res.result.list.number;
        this.addcharging = res.result.list.charging;
        this.color = res.result.list.colour;
      } else {
        this.message.create('error', res.info);
        this.addcourse = false;
      }
    }); 
  }
// 删除课程
  removecourse(name){
    this.removeanddisableTit = '确认删除';
    this.removeanddisableContent = '确认删除该课程？';
    this.removeanddisable = true;
    this.coursesName = name;
    this.openType = 0;

  }
//关闭删除弹框  
  closeremoveanddisable(){
    this.removeanddisable = false;
  }
//删除弹框确认按钮
  isremoveanddisable(){
   
    if (this.openType==0){
      this.http.post(this.domain + '/scheduling/deleteSyllabus', { syllabusName: this.coursesName }, false).then(res => {
        if (res.code == 1000) {
          this.message.create('success', '删除成功！');
          this.removeanddisable = false;
          this.querySelect();
          this.selectDataArr();
        }else{
          this.message.create('error', res.info);
        }
      });
     
    }
  }
  //课程内容
  courseContent(id){
    this.classContent = true;
    this.ListmainId = id;
    this.http.post(this.domain + '/scheduling/selectContentsAll', { id: id }, false).then(res => {
      if (res.code == 1000) {
        this.Listmain = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });    
  }

  closeclassContent(){
    this.classContent = false;
  }
  isclassContent(){
    this.classContent = false;
  }
//新增课程内容
  addcourseContent(){
    
  }

  addcontentfindList(){
    this.addclassContent = true;
  }
  closeaddclassContent(){
    this.addclassContent = false;
    this.modifyId = '';
  }
  isaddclassContent() {
    if (!this.period){
      this.message.create('error', '课时不能为空');
      return false;
    }
    if (!this.curriculum) {
      this.message.create('error', '课程重点不能为空');
      return false;
    }
    if (!this.content) {
      this.message.create('error', '上课内容不能为空');
      return false;
    }

    if ( !this.modifyId ){
      let paramJson: any = JSON.stringify({
        period: this.period,
        curriculum: this.curriculum,
        content: this.content,
        syllabusId: this.ListmainId,
      });
      this.http.post(this.domain + '/scheduling/insertContents', { paramJson }, false).then(res => {
        if (res.code == 1000) {
          this.courseContent(this.ListmainId);
          this.message.create('success', '添加成功！');
          this.period = '';
          this.curriculum = '';
          this.content = "";
          this.addclassContent = false;
          this.modifyId = '';
          this.color = null;
        } else {
          this.message.create('error', res.info);
        }
      }); 
    }else{
      let paramJson: any = JSON.stringify({
        period: this.period,
        curriculum: this.curriculum,
        content: this.content,
        id: this.modifyId,
      });
      this.http.post(this.domain + '/scheduling/updateContents', { paramJson }, false).then(res => {
        if (res.code == 1000) {
          this.courseContent(this.ListmainId);
          this.message.create('success', '修改成功！');
          this.period = '';
          this.curriculum = '';
          this.content = "";
          this.addclassContent = false;
          this.modifyId = ''; 
        } else {
          this.message.create('error', res.info);
        }
      }); 
    }   
  }
  //删除内容列表
  removeclassContentfun(id){
    this.removeclassContent = true;
    this.classListid = id;
  }
  closeremoveclassContent(){
    this.removeclassContent = false;   
  }
  isremoveclassContent(){
    this.http.post(this.domain + '/scheduling/deleteContents', { id: this.classListid }, false).then(res => {
      if (res.code == 1000) {
        this.removeclassContent = false;
        this.message.create('success', '删除成功！');
        this.courseContent(this.ListmainId);
      } else {
        this.message.create('error', res.info);
      }
    });    
  }
  //修改内容
  modifyListContent(id){
    this.http.post(this.domain + '/scheduling/selectContents', { id: id }, false).then(res => {
      if (res.code == 1000) {
        this.addclassContent = true;
        this.period = res.result.list.period;
        this.curriculum = res.result.list.curriculum;
        this.content = res.result.list.content;
        this.modifyId = id;
        
      } else {
        this.message.create('error', res.info);
      }
    });       
  }
  selectColor(data){
    this.color = data;

  }

  ngOnInit() {
  }

}
