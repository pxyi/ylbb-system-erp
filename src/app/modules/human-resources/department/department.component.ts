import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpService } from '../../../ng-relax/services/http.service';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  formGroup: FormGroup;

  showDrawer: boolean;
  saveLoading: boolean;

  teacherList: any[] = [];

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      id: [],
      name: [, [Validators.required], [this.positionAsyncValidator]],
      employeeName: [],
      comment: []
    });
    this.http.post('/member/getStoreTeachers', {}, false).then(res => this.teacherList = res.result);
  }

  ngOnInit() {
  }

  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/department/saveBandRecord', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.table._request();
        this.showDrawer = false;
        this.saveLoading = false;
      }).catch(err => this.saveLoading = false);
    }
  }

  delete(id) {
    this.http.post('/department/removeBandRecord', { id }).then(res => this.table._request())
  }

  update(data = { id: null, position: null, bandName: null, salary: null, bandRate: null, comment: null }) {
    this.showDrawer = true;
    this.formGroup.patchValue(data);
  }

  positionAsyncValidator = (control: FormControl): any => {
    return Observable.create(observer => {
      let params = {
        id: this.formGroup.get('id').value,
        position: control.value
      };
      this.http.post('/department/checkUnique', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(res.result ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

}
