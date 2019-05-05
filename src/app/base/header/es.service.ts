import { Injectable } from '@angular/core';
import { BaseModule } from '../base.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: BaseModule
})
export class EsService {

  $memberInfoSubject = new Subject();
  constructor() { }
}
