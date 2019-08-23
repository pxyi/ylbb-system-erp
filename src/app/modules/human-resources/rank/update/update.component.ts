import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() rankInfo = {};

  formGroup: FormGroup
  rankList: any[];
  constructor(
    private http: HttpService,
    private drawerRef: NzDrawerRef,
    private fb: FormBuilder = new FormBuilder()
  ) {
    this.formGroup = this.fb.group({
      id: [],
      teacherRankId: [, [Validators.required]]
    });
  }

  ngOnInit() {
    this.http.post('/teacherRank/getStoreRanks', { }, false).then(res => {
        this.rankList = res.result;
    });
    this.formGroup.patchValue(this.rankInfo)
  }

  saveLoading: boolean;
  @DrawerSave('/teacherRank/setTeacherRank') save: () => void;
  @DrawerClose() close: () => void;



}
