import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() staffInfo;

  formGroup: FormGroup;

  loading: boolean;

  bandList: any[] = [];
  departmentList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<string>
  ) { 
    this.http.post('/humanInformation/getBands', {}, false).then(res => this.bandList = res.result);
    this.http.post('/department/getDepartments', {}, false).then(res => this.departmentList = res.result);
  }

  ngOnInit() {
    console.log(this.staffInfo);
    this.formGroup = this.fb.group({
      name: [this.staffInfo.name, [Validators.required]],                 //	是	string	员工姓名
      nameEn: [this.staffInfo.nameEn, [Validators.pattern(/^[a-zA-Z]+$/)]],             //	否	string	英文名
      mobile: [this.staffInfo.mobile, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],                 //	是	string	手机号码
      idCardNo: [this.staffInfo.idCardNo, [Validators.required, Validators.pattern(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)]],                 //	是	string	身份证号
      idCardAddress: [this.staffInfo.idCardAddress],              //	否	string	身份证地址
      parentName: [this.staffInfo.parentName],             //	否	string	亲属姓名
      homePhone: [this.staffInfo.homePhone, [Validators.pattern(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)]],              //	否	string	家庭电话
      address: [this.staffInfo.address],              //	否	string	家庭住址
      email: [this.staffInfo.email, [Validators.pattern(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)]],              //	否	string	email
      qq: [this.staffInfo.qq],             //	否	string	qq
      bandId: [this.staffInfo.bandId, [Validators.required]],                 //	是	Long	职位id
      departmentId: [this.staffInfo.departmentId, [Validators.required]],                 //	是	Long	部门id
      insured: [this.staffInfo.insured],                 //	是	int	是否上保险 0: ’否’, 1: ’是’
      birthday: [this.staffInfo.birthday, [Validators.required]],                 //	是	string	员工生日
      joinDate: [this.staffInfo.joinDate, [Validators.required]],                 //	是	string	入职时间
      leaveDate: [this.staffInfo.leaveDate],              //	否	string	离职时间
      sex: [this.staffInfo.sex],                 //	是	int	性别 ‘1’: ’女’, ’0’: ’男’
      state: [this.staffInfo.state],                 //	是	string	员工状态 ‘全职’: ’全职’, ’临时’: ’临时’, ’兼职’: ’兼职’, ’离职’: ’离职’
      notStatistics: [this.staffInfo.notStatistics],                 //	是	boolean	是否提成 false: ’是’, true: ’否’
      teacher: [this.staffInfo.teacher],                 //	是	boolean	是否泳师 true: ’是’, false: ’否’
      online: [this.staffInfo.online, [Validators.required]],                 //	是	int	是否网上预约 0: ’不可以’, 1: ’可以’
      serviceArea: [this.staffInfo.serviceArea],                 //	是	int	服务区域 1: ’婴儿区’, 2: ’幼儿区’, 3: ’兼顾’
      serviceNum: [this.staffInfo.serviceNum, [Validators.required]],                 //	是	int	接待能力
    });

    this.formGroup.get('idCardNo').valueChanges.subscribe(res => {
      if (res.length == 18) {
        var birthday = res.substr(6, 8).split('');
        birthday.splice(4, 0, '-');
        birthday.splice(7, 0, '-');
        birthday = birthday.join('');
        this.formGroup.patchValue({ birthday });
      }
    })
  }

  save() {

  }

  close() {
    this.drawerRef.close();
  }

  /* ------------ 禁止选择今天以后的日期 ------------ */
  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

}
