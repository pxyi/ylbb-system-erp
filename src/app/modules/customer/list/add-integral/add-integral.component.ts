import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-integral',
  templateUrl: './add-integral.component.html',
  styleUrls: ['./add-integral.component.scss']
})
export class AddIntegralComponent implements OnInit {

  @Input() id;

  @Input() userInfo;

  formGroup: FormGroup;
  
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      memberId: [this.id],
      name: [{ value: this.userInfo.name, disabled: true }, [Validators.required]],
      memberPoint: [, [Validators.required]],
      comment: []
    })
  }

  save(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.formGroup.invalid) {
        for (let i in this.formGroup.controls) {
          this.formGroup.controls[i].markAsDirty();
          this.formGroup.controls[i].updateValueAndValidity();
        }
        resolve(false);
      } else {
        this.http.post('/member/saveMemberPoint', {
          paramJson: JSON.stringify(this.formGroup.value)
        }).then(res => resolve(true)).catch(err => resolve(false));
      }
    })
  }

}
