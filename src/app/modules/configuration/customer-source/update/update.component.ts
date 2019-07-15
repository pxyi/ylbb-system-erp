import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NzMessageService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() data;

  formGroup:FormGroup;

  saveLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private http: HttpService, 
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      source: [, [Validators.required]]
    });
    this.data && this.formGroup.patchValue({source: this.data.name});
  }

  close() {
    this.drawerRef.close();
  }

  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      var paramJson = {
        id   : this.data && this.data.id,
        name : this.formGroup.get('source').value
      }
      if(!paramJson.id){delete(paramJson.id)};
      this.http.post('/memberSource/modify', {paramJson: JSON.stringify(paramJson)}).then(res => {
        if (res.code == 1000) {
          this.saveLoading = false;
          this.drawerRef.close();
        } else {
          this.message.create('warning', res.info);
        }
      })
    }
  }

}
