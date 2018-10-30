import { HttpService } from './../../../../ng-relax/services/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() commodityInfo;

  saveLoading: boolean;

  formGroup: FormGroup;

  cardTypeList: any[] = [];

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>,
    private http: HttpService
  ) { 
    this.http.post('/cardBusinessManagement/getStoreCardTypeCategores', {}, false).then(res => this.cardTypeList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      name: [, [Validators.required], [this.nameAsyncValidator]],                  //	商品名称
      status: [0, [Validators.required]],                  // 商品状态 0:’启用’,1:’禁用’
      cardTimesFlag: [1, [Validators.required]],                 // 是否计次消费 0:’是’,1:’否’
      type: [1, [Validators.required]],                  //	商品类型
      integral: [0, [Validators.required]],                  // 是否积分 计积分 0:’不记积分’,1:’记积分’
      defaultTag: [0, [Validators.required]],                  // 是否设置为默认 是否默认 0:’否’,1:’是’
      introduction: [],                                        //	商品说明
    });

    this.formGroup.get('type').valueChanges.subscribe(val => {
      if (val == 0) {
        this.formGroup.addControl('chargeType', new FormControl(this.commodityInfo.id ? this.commodityInfo.chargeType : null, [Validators.required]));
        this.formGroup.addControl('cardNum', new FormControl(this.commodityInfo.id ? this.commodityInfo.cardNum : 0));

        this.formGroup.removeControl('stockPrice');
        this.formGroup.removeControl('price');
        this.formGroup.removeControl('inventory');
        this.formGroup.removeControl('commission');
      } else {
        this.formGroup.addControl('stockPrice', new FormControl(this.commodityInfo.id ? this.commodityInfo.stockPrice : null, [Validators.required]));
        this.formGroup.addControl('price', new FormControl(this.commodityInfo.id ? this.commodityInfo.price : null, [Validators.required]));
        this.formGroup.addControl('inventory', new FormControl(this.commodityInfo.id ? this.commodityInfo.inventory : true, [Validators.required]));
        this.formGroup.addControl('commission', new FormControl(this.commodityInfo.id ? this.commodityInfo.commission : true, [Validators.required]));

        this.formGroup.removeControl('chargeType');
        this.formGroup.removeControl('cardNum');
      }
    });
    
    this.commodityInfo.id && this.formGroup.patchValue(this.commodityInfo);
  }

  save() {
    if (this.formGroup.invalid) {
      for (let control in this.formGroup.controls) {
        this.formGroup.controls[control].markAsDirty();
        this.formGroup.controls[control].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/commodity/saveCommodity', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.drawerRef.close(true);
      }).catch(res => this.saveLoading = false);
    }
  }

  close() {
    this.drawerRef.close();
  }

  nameAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let params = {
        id: this.formGroup.get('id').value,
        name: control.value
      };
      this.http.post('/commodity/checkUnique', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(res.result.valid ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

}
