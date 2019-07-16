import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';

@Component({
  selector: 'app-bonussales',
  templateUrl: './bonussales.component.html',
  styleUrls: ['./bonussales.component.scss']
})
export class BonusSalesComponent implements OnInit {

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
      role: [, [Validators.required]],
      minAmount: [, [Validators.required]],
      maxAmount: [, [Validators.required]],
      ratio: [, [Validators.required]],
      settleType: [, [Validators.required]]
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
      let request = this.formGroup.get('id') ? '/bonusSalesSetting/save' : '/bonusSalesSetting/save';
      this.http.post(request, { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.table._request();
        this.showDrawer = false;
        this.saveLoading = false;
      }).catch(err => this.saveLoading = false);
    }
  }
  
  delete(id) {
    this.http.post('/bonusSalesSetting/remove', { id }).then( res => this.table._request())
  }

  update(data = { id: null, role: null, minAmount: null, maxAmount: null, ratio: null, settleType: null }) {
    this.showDrawer = true;
    this.formGroup.patchValue(data);
  }

}