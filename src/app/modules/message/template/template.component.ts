import { HttpService } from './../../../ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
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
      content: [, [Validators.required]],
    });
  }

  ngOnInit() {
  }


  updateTemplate(data?) {
    this.showDrawer = true;
    data && this.formGroup.patchValue(data);
  }

  deleteTemplate(id) {
    
  }
  saveTemplate() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('param', {
        paramJson: JSON.stringify(this.formGroup.value)
      }).then(res => {}).catch(err => {});
    }
  }

}
