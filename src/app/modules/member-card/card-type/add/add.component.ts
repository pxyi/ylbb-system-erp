import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() id: number | null;

  formGroup: FormGroup;

  loading: boolean;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      name: [, [Validators.required]],
      categoryId: [, [Validators.required]], 
      effectMonth: [, [Validators.required]],
      feeType: [, [Validators.required]],
      times: [, [Validators.required]],
      freeTimes: [, [Validators.required]],
      balance: [, [Validators.required]],
      openPoints: [, [Validators.required]],
      isTong: [false],
      comment: []
    })
  }

  ngOnInit() {
  }

}
