import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { DrawerRefClose } from 'src/app/ng-relax/decorators/drawerRefClose.decorator';

@Component({
  selector: 'app-satisfaction-update',
  templateUrl: './satisfaction-update.component.html',
  styleUrls: ['./satisfaction-update.component.scss']
})
export class SatisfactionUpdateComponent implements OnInit {

  formGroup: FormGroup;

  @GetList('/bonusSatisfaction/getTeacherRanks') teacherRankList: any;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder,
    private drawerRef: NzDrawerRef
  ) {
    typeof this.teacherRankList === 'function' && this.teacherRankList();

    this.formGroup = this.fb.group({
      rankId: [, [Validators.required]],
      rank1: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      rank2: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      rank3: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      rank4: [, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    })
  }

  ngOnInit() {
  }

  saveLoading: boolean;
  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      let params = { 
        rankId: this.formGroup.get('rankId').value,
        rank: [this.formGroup.get('rank1').value, this.formGroup.get('rank2').value, this.formGroup.get('rank3').value, this.formGroup.get('rank4').value]
      };
      this.http.post('/bonusSatisfaction/addBonusSatisfaction', {
        paramJson: JSON.stringify(params)
      }).then(res => {
        this.saveLoading = false;
        this.drawerRef.close(true);
      }).catch(err => this.saveLoading = false);
    }
  }

  @DrawerRefClose() close: () => void;

}