"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var random_id_generator_service_1 = require('./random-id-generator-service');
var WebStorgeService = (function () {
    function WebStorgeService(_randomIdGeneratorService) {
        this._randomIdGeneratorService = _randomIdGeneratorService;
    }
    WebStorgeService.prototype.save = function (collectionName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var items = _this._getFromLocalStorage(collectionName);
            if (!item.id || item.id == 0) {
                item.id = _this._randomIdGeneratorService.generateNewRandomID();
                // console.log("new item ", item);
                items.push(item);
            }
            else {
                var index = _this._find(items, item);
                // console.log("save item["+index+"] = ", index);
                items[index] = item;
            }
            _this._setToLocalStorage(collectionName, items);
            resolve(item);
        });
    };
    WebStorgeService.prototype.delete = function (collectionName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var items = _this._getFromLocalStorage(collectionName);
            var index = _this._find(items, item);
            // console.log("delete item["+index+"] = ", index);
            if (index > -1) {
                items.splice(index, 1);
                _this._setToLocalStorage(collectionName, items);
            }
            resolve(items);
        });
    };
    WebStorgeService.prototype.list = function (collectionName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var items = _this._getFromLocalStorage(collectionName);
            resolve(items);
        });
    };
    WebStorgeService.prototype.get = function (collectionName, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var items = _this._getFromLocalStorage(collectionName);
            var item = items.find(function (item) { return item.id === id; });
            resolve(item);
        });
    };
    WebStorgeService.prototype._getFromLocalStorage = function (collectionName) {
        var data = localStorage.getItem(collectionName);
        if (data) {
            return JSON.parse(data);
        }
        return [];
    };
    ;
    WebStorgeService.prototype._setToLocalStorage = function (collectionName, data) {
        localStorage.setItem(collectionName, JSON.stringify(data));
    };
    ;
    WebStorgeService.prototype._find = function (items, item) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                // console.log("item["+i+"] = ", item[i]);
                return i;
            }
        }
        return -1;
    };
    WebStorgeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [random_id_generator_service_1.RandomIdGeneratorService])
    ], WebStorgeService);
    return WebStorgeService;
}());
exports.WebStorgeService = WebStorgeService;
//# sourceMappingURL=web-storage.service.js.map