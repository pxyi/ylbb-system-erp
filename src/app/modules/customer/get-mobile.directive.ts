import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[getMobile]'
})
export class GetMobileDirective {

  @Input('getMobile') _id: string;

  phoneNumber: string | number;

  constructor(
    private el: ElementRef,
    private http: HttpService,
    private message: NzMessageService
  ) { }

  private _requestLoading: boolean;
  @HostListener('click') onClick() {
    if (!this.phoneNumber && !this._requestLoading) {
      this._requestLoading = true;
      this.el.nativeElement.innerHTML = `<i class="anticon anticon-loading anticon-spin" ></i>`;
      this.http.post('/common/lookParentTelphone', { paramJson: JSON.stringify({ id: this._id.toString() }) }, false).then(res => {
        if (res.code == 1000) {
          this.phoneNumber = res.result.mobilePhone;
          this.el.nativeElement.innerText = res.result.mobilePhone;
          this.el.nativeElement.style.color = 'rgba(0,0,0,.65)';
        }
        this._requestLoading = false;
      }, err => {
        this._requestLoading = false;
        this.el.nativeElement.innerText = '查看';
      });
    } else if (this.phoneNumber && !this._requestLoading) {
      let oInput: any = document.createElement('input');
      oInput.value = this.phoneNumber;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand('Copy');
      oInput.style.display = 'none';
      oInput.remove();
      this.message.success('已复制电话号码到剪切板~');
    }
  }

}
