import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';
@Component({
  selector: 'app-update2',
  templateUrl: './update2.component.html',
  styleUrls: ['./update2.component.less']
})
export class Update2Component implements OnInit {
  @ViewChild('table') table: TableComponent;

  formGroup: FormGroup;
  formEditorGroup: FormGroup;
  showDrawer: boolean;
  showEditor: boolean;
  saveLoading: boolean;
  ranksList: any[];
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder()
  ) {                   
    this.http.post('/bonusSatisfaction/getTeacherRanks', { }).then(res=>{ this.ranksList  = res.result; });
    this.formGroup = this.fb.group({
      rankId: [, [Validators.required]],
      rank1: [, [Validators.required]],
      rank2: [, [Validators.required]],
      rank3: [, [Validators.required]],
      rank4: [, [Validators.required]],
      rank: []
    })
    this.formEditorGroup= this.fb.group({
      id: [, [Validators.required]],
      ratio: [, [Validators.required]],
      rankShortName: [{ disabled: true }]
    })
  }

  ngOnInit() {
  }

  save() {
    if (this.formGroup.invalid) {
      for (let i in this.formGroup.controls) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      let rank = [ Number(this.formGroup.value.rank1),Number(this.formGroup.value.rank2), Number(this.formGroup.value.rank3), Number(this.formGroup.value.rank4) ];
      this.formGroup.patchValue({ rank });
      this.http.post('/bonusSatisfaction/addBonusSatisfaction', { paramJson: JSON.stringify(this.formGroup.value) }).then(res => {
        this.table._request();
        this.showDrawer = false;
        this.saveLoading = false;
      }).catch(err => this.saveLoading = false);
    }
  }
  save1() {
    if (this.formEditorGroup.invalid) {
      for (let i in this.formEditorGroup.controls) {
        this.formEditorGroup.controls[i].markAsDirty();
        this.formEditorGroup.controls[i].updateValueAndValidity();
      }
    } else {
      this.saveLoading = true;
      this.http.post('/bonusSatisfaction/editBonusSatisfaction', { paramJson: JSON.stringify(this.formEditorGroup.value) }).then(res => {
        this.showEditor = false;
        this.showDrawer = false;
        this.saveLoading = false;
        this.table._request();
      
      }).catch(err => this.saveLoading = false);
    }
  }

  
  delete(id) {
    this.http.post('/bonusSalesSetting/remove', { id }).then( res => this.table._request())
  }

  update(data = { rankId: null, rank1: null, rank2: null, rank3: null, rank4: null, rank: null }) {
    this.showDrawer = true;
    this.formGroup.patchValue(data);
  }
  editor(data = { id: null, ratio: null, rankShortName:null}) {
    this.showEditor = true;
    this.formEditorGroup.patchValue(data);
  }
}
