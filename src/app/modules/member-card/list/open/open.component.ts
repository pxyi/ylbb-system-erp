import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit {

  @Input() id;
  
  @Input() memberCardInfo;

  formGroup: FormGroup

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      cardCode: [{value: this.memberCardInfo.cardCode, disabled: true}],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      // cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      stopEndDate: [{ value: this.memberCardInfo.stopEndDate, disabled: true }],
    })
  }



}
