import { AliOssClientService } from './../../services/alioss-client.service';
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ea-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
  }]
})
export class EditorComponent implements OnInit {

  @Input() placeholder: string;

  @Input() height: number = 280;

  editorTextChange: any = () => { };

  private _editorText: string;
  @Input()
  set editorText(text) {
    this.editorTextChange(text);
  }
  get editorText() {
    return this._editorText;
  }

  constructor(
    private alioss: AliOssClientService
  ) { }

  ngOnInit() {
  }


  /* 实现 ControlValueAccessor 接口部分 */
  writeValue(val: any): void {
    if (val) {
      this._editorText = val;
      this.editorText = val;
    }
  }
  registerOnChange(fn: any): void {
    this.editorTextChange = fn;
  }
  registerOnTouched(fn: any): void {
  }




  private _editor;
  editorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this._imageHandler.bind(this));
    this._editor = quill;
  }

  private _imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/jpg');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      let fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
      let fileName = new Date().getTime() + `.${fileType}`;
      this.alioss.getClient().then(res => {
        res.multipartUpload(fileName, file, {}).then(res => {
          let imageSrc = res.url ? res.url : 'http://' + res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          const range = this._editor.getSelection(true);
          this._editor.insertEmbed(range.index, 'image', imageSrc);
        })
      })
    });
    Imageinput.click();
  }

}
