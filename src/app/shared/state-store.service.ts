import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateStoreService {
  //propriétés à émettre
  private isConnect: boolean = false;

  //behavior d'émission
  private _isConnect$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isConnect
  );

  //props obs/observer async
  public isConnect$: Observable<boolean> = this._isConnect$.asObservable();

  setIsConnect(stateConnect: boolean) {
    this.isConnect = stateConnect;
    this._isConnect$.next(this.isConnect);
  }

  getIsConnect() {
    return this.isConnect;
  }

  constructor() {}
}
