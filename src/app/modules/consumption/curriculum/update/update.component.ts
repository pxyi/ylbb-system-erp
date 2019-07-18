import { HttpService } from './../../../../ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() curriculumInfo;
  
  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      cardCode: [],
      memberName: [],
      memberNick: [],
      teacherName: [],
      type: [, [Validators.required]],
      remarks: []
    });
    this.formGroup.patchValue(this.curriculumInfo);
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  @DrawerSave('/memberLesson/editMemberLessonRecord') save: () => void;

}
