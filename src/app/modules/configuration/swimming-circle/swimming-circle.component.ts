import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../../ng-relax/services/http.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-swimming-circle',
  templateUrl: './swimming-circle.component.html',
  styleUrls: ['./swimming-circle.component.scss']
})
export class SwimmingCircleComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  formGroup: FormGroup;
  saveLoading: boolean;

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService
  ) { 
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required], [this.nameAsyncValidator])
    });
  }

  ngOnInit() {
  }

  save(drawerRef) {
    if (this.formGroup.invalid) {
      this.formGroup.get('name').markAsDirty();
      this.formGroup.get('name').updateValueAndValidity();
      return;
    }
    this.http.post('/swimRing/saveStoreSwimRing', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
      drawerRef.close();
      this.table._request();
    })
  }

  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<any>;

  updateSwimming(data = {id: null, name: null}) {
    this.formGroup.patchValue(data);
    this.drawer.create({
      nzTitle: '泳圈型号信息',
      nzWidth: 720,
      nzContent: this.drawerTemplate
    });
  }

  deleteSwimming(id) {
    this.http.post('/swimRing/removeStoreSwimRing', { id }).then(res => this.table._request());
  }
  
  nameAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let params = {
        id: this.formGroup.get('id').value,
        name: control.value
      };
      this.http.post('/swimRing/checkSwimRingUnique', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(!res.result.flag ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

}
