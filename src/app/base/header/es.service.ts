import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EsService {

  $memberInfoSubject = new Subject();
  constructor() { }
}
