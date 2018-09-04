import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-supplement',
  templateUrl: './supplement.component.html',
  styleUrls: ['./supplement.component.scss']
})
export class SupplementComponent implements OnInit {

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
      type: [0],
      cardCode: [{ value: this.memberCardInfo.cardCode, disabled: true }],
      memberName: [{ value: this.memberCardInfo.memberName, disabled: true }],
      newSerial: [, [Validators.required]],
      newCode: [, [Validators.required]]
    });
  }

  @DrawerSave('/memberCard/replaceCard') save: () => Promise<boolean>;

}
