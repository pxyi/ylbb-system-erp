import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() positionInfo = {};

  formGroup: FormGroup

  constructor(
    private http: HttpService,
    private drawerRef: NzDrawerRef,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      id: [],
      position: [, [Validators.required], [this.positionAsyncValidator]],
      starLevel: [, [Validators.required]],
      salary: [, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      role: [, [Validators.required]],
      comment: []
    });
  }

  ngOnInit() {
    this.formGroup.patchValue(this.positionInfo)
  }

  saveLoading: boolean;
  @DrawerSave('/yeqs/humanInformation/saveBandRecord') save: () => void;
  @DrawerClose() close: () => void;

  private positionAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let params = {
        id: this.formGroup.get('id').value,
        position: control.value
      };
      this.http.post('/yeqs/humanInformation/checkUnique', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(res.result ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

}
