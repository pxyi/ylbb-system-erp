import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pay-apply',
  templateUrl: './pay-apply.component.html',
  styleUrls: ['./pay-apply.component.less']
})
export class PayApplyComponent implements OnInit {

  tplModal: NzModalRef;
  htmlModalVisible = false;
  disabled = false;

  constructor(
    private modalService: NzModalService
  ) { }

  ngOnInit() {
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false
    });
  }

  destroyTplModal(): void {
    this.tplModal.destroy();
  }

}
