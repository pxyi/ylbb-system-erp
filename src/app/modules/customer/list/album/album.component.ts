import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { ModifyData } from 'src/app/ng-relax/decorators/list/modify.decorator';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less']
})
export class AlbumComponent implements OnInit {

  @Input() id;

  @Input() userInfo;

  @ViewChild('table') table: TableComponent

  formGroup: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private format: DatePipe,
    private drawerRef: NzDrawerRef
  ) { 
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      babyId: [this.id],
      monthAge: [this.userInfo.monthAge],
      cardCode: [this.userInfo.memberCard],
      photoListStr: [, [Validators.required]]
    })
  }
  

  selectedMonth;
  monthChange(e) {
    this.table.request({ babyId: this.id, createTime: this.format.transform(this.selectedMonth, 'yyyy-MM') });
  }

  @ModifyData('/babyGrowthAlbum/delete') delete: (id) => void;

  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  previewVisible: boolean;
  previewImage: string;

  @DrawerClose() close: () => void;

  saveLoading: boolean;
  @DrawerSave('/babyGrowthAlbum/save') save: () => void;

}
