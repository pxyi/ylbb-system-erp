import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

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
    this.http.post('/community/saveStoreCommunity', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
      drawerRef.close();
      this.table._request();
    })
  }

  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<any>;

  update(data = { id: null, name: null }) {
    this.formGroup.patchValue(data);
    this.drawer.create({
      nzTitle: '泳圈型号信息',
      nzWidth: 720,
      nzContent: this.drawerTemplate
    });
  }

  delete(id) {
    this.http.post('/community/removeStoreCommunity', { id }).then(res => this.table._request());
  }

  nameAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let params = {
        id: this.formGroup.get('id').value,
        name: control.value
      };
      this.http.post('/community/checkCommunity', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(!res.result.flag ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

}
