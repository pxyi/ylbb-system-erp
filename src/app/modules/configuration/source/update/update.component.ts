import { FormGroup, FormControl } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() sourceInfo: any = {};

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null)
  })

  constructor(
    private http: HttpService,
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.sourceInfo.id && this.formGroup.patchValue(this.sourceInfo);
  }

  @DrawerClose() close: () => void;

  saveLoading: boolean;
  @DrawerSave('/memberSource/modify') save: () => void;

  @ControlValid() valid: (key: string) => boolean;

}
