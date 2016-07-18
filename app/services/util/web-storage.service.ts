import { Injectable } from '@angular/core';
import { RandomIdGeneratorService } from './random-id-generator-service';

@Injectable()
export class WebStorgeService {

  constructor(private _randomIdGeneratorService: RandomIdGeneratorService) { }

    save(collectionName: string, item: any) {
      return new Promise((resolve, reject) => {
        let items = this._getFromLocalStorage(collectionName);
        if (!item.id || item.id == 0) {
          item.id = this._randomIdGeneratorService.generateNewRandomID();
          // console.log("new item ", item);
          items.push(item);
        } else {
          let index = this._find(items, item);
          // console.log("save item["+index+"] = ", index);
          items[index] = item;
        }
        this._setToLocalStorage(collectionName, items);
        resolve(item);
      });
    }

    delete(collectionName: string, item: any) {
      return new Promise((resolve, reject) => {
        let items = this._getFromLocalStorage(collectionName);
        let index = this._find(items, item);
        // console.log("delete item["+index+"] = ", index);
        if ( index > -1 ) {
          items.splice(index, 1);
          this._setToLocalStorage(collectionName, items);
        }
        resolve(items);
      });
    }

    list(collectionName: string) {
      return new Promise((resolve, reject) => {
        let items = this._getFromLocalStorage(collectionName);
        resolve(items);
      });
    }

    get(collectionName: string, id: string) {
      return new Promise((resolve, reject) => {
        let items = <any[]> this._getFromLocalStorage(collectionName);
        let item = items.find(item => item.id === id);
        resolve(item);
      });
    }

    private _getFromLocalStorage(collectionName: string) {
      let data = localStorage.getItem(collectionName);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    };

    private _setToLocalStorage(collectionName: string, data: any) {
      localStorage.setItem(collectionName, JSON.stringify(data));
    };

    private _find(items:any[], item: any) {
      for(let i=0; i<items.length; i++) {
        if (items[i].id===item.id) {
          // console.log("item["+i+"] = ", item[i]);
          return i;
        }
      }
      return -1;
    }
}
