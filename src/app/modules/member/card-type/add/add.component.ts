import { NzDrawerRef } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() id;

  @Input() cardTypeInfo: any = {};

  formGroup: FormGroup;
  skillsStatus: number;
  cardBusinessList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { 
    this.http.post('/yeqs/cardBusinessManagement/findList', {}, false).then(res => this.cardBusinessList = res.result);
  }

  ngOnInit() {

    this.formGroup = this.fb.group({
      id: [this.id],
      name: [this.cardTypeInfo.name, [Validators.required]],
      categoryId: [this.cardTypeInfo.categoryId, [Validators.required]],
      effectMonth: [this.cardTypeInfo.effectMonth, [Validators.required]],
      feeType: [this.cardTypeInfo.feeType, [Validators.required]],
      times: [this.cardTypeInfo.times, [Validators.required]],
      freeTimes: [this.cardTypeInfo.freeTimes, [Validators.required]],
      balance: [this.cardTypeInfo.balance, [Validators.required]],
      openPoints: [this.cardTypeInfo.openPoints, [Validators.required]],
      skillsStatus: [this.cardTypeInfo.skillsStatus || 0],
      withdrawAmount: [this.cardTypeInfo.withdrawAmount || 0, [Validators.required]],
      comment: [this.cardTypeInfo.comment]
    });
    if(this.cardTypeInfo.skillsStatus){
      if(this.cardTypeInfo.skillsStatus == 1){
      }else{
        this.formGroup.patchValue({ withdrawAmount: 0 });
      }
      this.skillsStatus = this.cardTypeInfo.skillsStatus;
    }
    this.formGroup.get('skillsStatus').valueChanges.subscribe(text => {
      if(text == 1){
        this.formGroup.patchValue({ withdrawAmount: '' });
      }else{
        this.formGroup.patchValue({ withdrawAmount: 0 });
      }
      this.skillsStatus = text;
    })
  }

  saveLoading: boolean;
  @DrawerSave('/yeqs/cardTypeManagement/modify') save: () => void;

  @DrawerClose() close: () => void;

}
