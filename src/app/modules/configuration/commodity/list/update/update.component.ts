import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() commodityInfo:any = {};

  formGroup: FormGroup;

  cardTypeList: any[] = [];

  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef<boolean>,
    private http: HttpService
  ) {
    this.http.post('/cardBusinessManagement/getStoreCardTypeCategores').then(res => this.cardTypeList = res.result);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      name: [, [Validators.required], [this.nameAsyncValidator]],                  //	商品名称
      status: [0, [Validators.required]],                  // 商品状态 0:’启用’,1:’禁用’
      chargeType: [0, [Validators.required]],                 // 是否计次消费 0:’是’,1:’否’
      type: [1, [Validators.required]],                  //	商品类型
      integral: [0, [Validators.required]],                  // 是否积分 计积分 0:’不记积分’,1:’记积分’
      defaultTag: [0, [Validators.required]],                  // 是否设置为默认 是否默认 0:’否’,1:’是’
      introduction: [],                                        //	商品说明
      discountFlag: [0, [Validators.required]],               //是否参与折扣
    });
    this.formTypeChange(this.formGroup.get('type').value);
    this.formGroup.get('type').valueChanges.subscribe(val => this.formTypeChange(val));

    this.commodityInfo && this.formGroup.patchValue(this.commodityInfo);
  }

  formTypeChange(val) {
    this.formGroup.patchValue({ chargeType: val });
    if (val == 0) {
      this.formGroup.addControl('categoryId', new FormControl(this.commodityInfo.id ? this.commodityInfo.categoryId : null, [Validators.required]));
      this.formGroup.addControl('cardNum', new FormControl(this.commodityInfo.id ? this.commodityInfo.cardNum : 0));
      this.formGroup.addControl('cardAmount', new FormControl(this.commodityInfo.id ? this.commodityInfo.cardAmount : null, [Validators.required]));

      this.formGroup.removeControl('stockPrice');
      this.formGroup.removeControl('price');
      this.formGroup.removeControl('inventory');
      this.formGroup.removeControl('commission');
      this.formGroup.removeControl('barCode');       //商品条码
      this.formGroup.removeControl('img');           //商品图片
      this.formGroup.removeControl('warningValue');  //库存提醒值

    } else {
      this.formGroup.addControl('stockPrice', new FormControl(this.commodityInfo ? this.commodityInfo.stockPrice : null, [Validators.required]));
      this.formGroup.addControl('price', new FormControl(this.commodityInfo ? this.commodityInfo.price : null, [Validators.required]));
      this.formGroup.addControl('inventory', new FormControl(this.commodityInfo ? this.commodityInfo.inventory : true, [Validators.required]));
      this.formGroup.addControl('commission', new FormControl(this.commodityInfo ? this.commodityInfo.commission : true, [Validators.required]));
      this.formGroup.addControl('barCode', new FormControl(this.commodityInfo ? this.commodityInfo.barCode : null, [], [this.barCodeAsyncValidator]));
      this.formGroup.addControl('img', new FormControl(this.commodityInfo ? this.commodityInfo.img : null));
      this.formGroup.addControl('warningValue', new FormControl(this.commodityInfo ? this.commodityInfo.warningValue : null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]));

      this.formGroup.removeControl('categoryId');
      this.formGroup.removeControl('cardNum');
      this.formGroup.removeControl('cardAmount');
    }
  }

  saveLoading: boolean;
  @DrawerSave('/commodity/saveCommodity') save: () => void;

  @DrawerClose() close: () => void;

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

  barCodeAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let id = this.formGroup.get('id').value;
      if (this.formGroup.get('barCode') && this.formGroup.get('barCode').value) {
        this.http.post('/commodity/checkBarCode', { id: id, barCode: this.formGroup.get('barCode').value }, false).then(res => {
          observer.next(res.result.valid ? null : { error: true, duplicated: true });
          observer.complete();
        }, err => {
          observer.next(null);
          observer.complete();
        })
      } else {
        observer.next(null);
        observer.complete();
      }
    })
  };

}
