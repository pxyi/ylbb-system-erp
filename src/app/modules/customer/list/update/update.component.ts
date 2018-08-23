import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {

  @Input() id: number;

  @Output() complate: EventEmitter<boolean> = new EventEmitter();

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      name: [, [Validators.required]],
      nick: [],
      sex: [, [Validators.required]],
      birthday: [, [Validators.required]],
      parentName: [, [Validators.required]],
      fixPhone: [],
      mobilePhone: [, [Validators.required]],
      communityId: [, [Validators.required]],
      illHistory: [, [Validators.required]],
      allergieHistory: [, [Validators.required]],
      babyType: [, [Validators.required]],
      babyNumber: [],
      source: [],
      comment: []
    });

  }

  ngOnInit() {
    console.log(this.id)
  } 

  ngOnDestroy() {
  }

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }
  save() {
    console.log('点击保存')
  }

  
}
