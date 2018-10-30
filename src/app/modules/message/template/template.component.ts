import { HttpService } from './../../../ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @ViewChild('table') table: TableComponent

  queryNode = [
    {
      label       : '标题',
      key         : 'title',
      type        : 'input'
    }
  ];

  formGroup: FormGroup;

  showDrawer: boolean;

  saveLoading: boolean;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      id: [],
      title: [, [Validators.required]],
      memo: [, [Validators.required]],
    });
  }

  ngOnInit() {
  }


  updateTemplate(data?) {
    this.showDrawer = true;
    data && this.formGroup.patchValue(data);
  }

  deleteTemplate(id) {
    this.http.post('/smsTemplate/delete', { paramJson: JSON.stringify({ id }) }).then(_ => this.table._request());
  }
  saveTemplate() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/smsTemplate/modify', {
        paramJson: JSON.stringify(this.formGroup.value)
      }).then(res => {
        this.table._request();
        this.saveLoading = false;
        this.showDrawer = false;
      }).catch(err => this.saveLoading = false);
    }
  }

}
