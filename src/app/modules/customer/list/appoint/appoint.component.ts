import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.scss']
})
export class AppointComponent implements OnInit {

  
  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      name: [, [Validators.required]],
      nick: [],
      sex: [, [Validators.required]],
      monthAge: [, [Validators.required]],
      babyType: [, [Validators.required]],
      communityId: [, [Validators.required]],
      cardId: [],
      spec: [],
      reserveDateId: [, [Validators.required]],
      reserveHourId: [, [Validators.required]],
      swimTeacher: [, [Validators.required]],
      ringId: [],
      comment: []
    })
  }

  ngOnInit() {
    
  }


  _disabledDate(current: Date): boolean {
    return current && current.getTime() < Date.now();
  }
  _disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5]
  }

}
