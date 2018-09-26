import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() appointmentInfo;

  formGroup: FormGroup;

  teacherList: any[] = [];
  communityList: any[] = [];
  swimRingList: any[] = [];
  memberCardList: any[] = [];

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>,
    private http: HttpService,
    private format: DatePipe
  ) { }

  ngOnInit() {
    this.http.post('/member/getStoreTeachers', {}, false).then(res => this.teacherList = res.result);
    this.http.post('/member/communityList', {}, false).then(res => this.communityList = res.result);
    this.http.post('/swimRing/getStoreSwimRings', {}, false).then(res => this.swimRingList = res.result);
    this.http.post('/memberCard/getMemberCards', { memberId: this.appointmentInfo.memberId }, false).then(res => this.memberCardList = res.result);
    
    let groups = {};
    this.appointmentInfo.reserveHM = new Date(`${this.appointmentInfo.reserveDate} ${this.appointmentInfo.rHour}:${this.appointmentInfo.rMinute}`);
    if (this.appointmentInfo.reserveStatus == 0) {
      Object.keys(this.appointmentInfo).map(key => {
        if (key == 'name' || key == 'monthAge' || key == 'communityId' || key == 'reserveDate' || key == 'rHour' || key == 'rMinute' || key == 'swimTeacherId') {
          groups[key] = [this.appointmentInfo[key], [Validators.required]];
        } else {
          groups[key] = [this.appointmentInfo[key]];
        }
      })
    } else {
      Object.keys(this.appointmentInfo).map(key => {
        groups[key] = [{ value: this.appointmentInfo[key], disabled: true}];
      })
    }
    this.formGroup = this.fb.group(groups);
  }


  saveLoading: boolean;
  saveDrawer() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/reserve/modity', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.drawerRef.close(true);
      })
    }
  }
  closeDrawer() {
    this.drawerRef.close(false);
  }

  reserveChange(e) {
    if (e) {
      let newHour = this.format.transform(e, 'yyyy-MM-dd HH:mm').split(' ')[1];
      this.appointmentInfo.rHour = newHour.split(':')[0];
      this.appointmentInfo.rMinute = newHour.split(':')[1];
    }
  }

  disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];
  }

}
