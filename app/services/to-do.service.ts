import { Injectable } from '@angular/core'
import { ToDo } from '../models/to-do';
import { WebStorgeService } from './util/web-storage.service';

@Injectable()
export class ToDoService {

  private collectionName = "to-do-list";

  constructor(private _webStorgeService: WebStorgeService) { }

  save(toDo: ToDo) {
    return this._webStorgeService.save(this.collectionName, toDo);
  }

  delete(toDo: ToDo) {
    return this._webStorgeService.delete(this.collectionName, toDo);
  }

  list() {
    return this._webStorgeService.list(this.collectionName);
  }

  get(id: string) {
    return this._webStorgeService.get(this.collectionName, id);
  }

}
