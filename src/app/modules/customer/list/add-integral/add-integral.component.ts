import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from '../../../../ng-relax/decorators/drawer.decorator';

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


  @DrawerSave('/member/saveMemberPoint') save: () => Promise<boolean>;

}
