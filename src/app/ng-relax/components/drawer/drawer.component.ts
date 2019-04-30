import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OptionsKey } from '../query/query.component';

@Component({
  selector: 'ea-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.less']
})
export class DrawerComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({ id: new FormControl() });

  _formControls: any[] = [];

  @Input() id: number;

  @Input() 
  set formControls(controls: ControlNode[]) {
    controls.map(control => {
      if (control.type === 'select' || control.type === 'radio') {
        control.optionKey = control.optionKey || { label: 'name', value: 'id' };
        if (control.optionsUrl) {
          this.http.post(control.optionsUrl, {}, false).then(result => {
            control.options = (control.options || []).concat(result.result);
          })
        }
      }

      let validators = [];
      control.required && validators.push(Validators.required);
      control.pattern && validators.push(Validators.pattern(control.pattern));
      this.formGroup.addControl(control.key, new FormControl(null, validators))
    });
    this._formControls = controls;
  }

  @Input() formAction: string;

  @Input() formValue: any = {};

  @Input() formValueUrl: string;

  @Output() callback: EventEmitter<boolean | object> = new EventEmitter();

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) { 
  }

  ngOnInit() {
    this.formValue.id = this.id;
    this.formGroup.patchValue(this.formValue);
    this.formValueUrl && this.http.post(this.formValueUrl, { id: this.id }, false).then(res => this.formGroup.patchValue(res.result));
  }

  drawerClose() {
    this.callback.emit(false);
  }

  saveLoading: boolean;
  drawerSave() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.http.post(this.formAction, { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.callback.emit(false);
      }).catch(err => this.callback.emit(err) );
    }
  }

}


export interface ControlNode {
  label       : string;
  key         : string;
  type        : 'input' | 'select' | 'radio' | 'between' | 'datepicker' | 'rangepicker' | 'checkbox' | 'monthpicker';
  default?    : any;
  valueKey?   : string[];
  options?    : any[];
  optionsUrl? : string;
  optionKey?  : OptionsKey;
  ranges?     : Object;
  placeholder?: string | string[];
  multiple?   : number;

  colspan?    : number;
  required?   : boolean;
  pattern?    : string;
}