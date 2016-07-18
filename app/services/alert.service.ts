import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { ToDo } from '../models/to-do';

@Injectable()
export class AlertService {

  private _onToDoDeleted = new Subject<ToDo>();
  private _onColorSelected = new Subject<string>();
  private _onError = new Subject<string>();
  private _onImageLoaded = new Subject<string>();
  private _onImageDeleted = new Subject<string>();

  onToDoDeleted$ = this._onToDoDeleted.asObservable();
  onColorSelected$ = this._onColorSelected.asObservable();
  onError$ = this._onError.asObservable();
  onImageLoaded$ = this._onImageLoaded.asObservable();
  onImageDeleted$ = this._onImageDeleted.asObservable();

  onToDoDeleted(toDo: ToDo) {
    this._onToDoDeleted.next(toDo);
  }

  onColorSelected(color: string) {
    this._onColorSelected.next(color);
  }

  onError(error: string) {
    this._onError.next(error);
  }

  onImageLoaded(image: string) {
    this._onImageLoaded.next(image);
  }

  onImageDeleted(image: string) {
    this._onImageDeleted.next(image);
  }

}
