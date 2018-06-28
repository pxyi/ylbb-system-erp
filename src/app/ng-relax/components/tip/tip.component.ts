import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'ea-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent {

  /**
   * @param       指定提示样式
   * @description 有四种选择 'success', 'info', 'warning', 'error'
   */
  @Input() type       : string = 'success';
           typeClass  : string;

  /**
   * @param       显示关闭按钮
   */
  @Input() showClose  : boolean;

  /**
   * @param       是否显示
   */
  @Input() isShow     : boolean = true;
  
  /**
   * @param       显示类型图标
   */
  @Input() showIcon   : boolean = true;

  /**
   * @param       关闭时触发回调
   */
  @Output() onClose: EventEmitter<any> = new EventEmitter();


  constructor() { }

  _close(): void {
    this.isShow = false;
    this.onClose.emit();
  }

}
