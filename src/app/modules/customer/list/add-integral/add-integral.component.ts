import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-integral',
  templateUrl: './add-integral.component.html',
  styleUrls: ['./add-integral.component.scss']
})
export class AddIntegralComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
    this.formGroup = this.fb.group({
      name: [{value: null, disabled: true}, [Validators.required]],
      point: [, [Validators.required]],
      comment: []
    })
  }

  ngOnInit() {
  }

}
