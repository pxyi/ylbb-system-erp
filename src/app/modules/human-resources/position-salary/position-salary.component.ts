import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { TableComponent } from './../../../ng-relax/components/table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-position-salary',
  templateUrl: './position-salary.component.html',
  styleUrls: ['./position-salary.component.scss']
})
export class PositionSalaryComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  formGroup: FormGroup;

  showDrawer: boolean;
  saveLoading: boolean;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      id: [],
      position: [, [Validators.required], [this.positionAsyncValidator]],
      bandName: [, [Validators.required]],
      salary: [, [Validators.required]],
      bandRate: [, [Validators.required]],
      comment: []
    })
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
      let request = this.formGroup.get('id') ? '/humanInformation/saveBandRecord' : '/humanInformation/saveBandRecord';
      this.http.post(request, { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.table._request();
        this.showDrawer = false;
        this.saveLoading = false;
      }).catch(err => this.saveLoading = false);
    }
  }
  
  delete(id) {
    this.http.post('/humanInformation/removeBandRecord', { id }).then( res => this.table._request())
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
      this.http.post('/humanInformation/checkUnique', { paramJson: JSON.stringify(params) }, false).then(res => {
        observer.next(res.result ? null : { error: true, duplicated: true });
        observer.complete();
      }, err => {
        observer.next(null);
        observer.complete();
      })
    })
  };

}