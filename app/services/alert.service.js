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
var Subject_1 = require('rxjs/Subject');
var AlertService = (function () {
    function AlertService() {
        this._onToDoDeleted = new Subject_1.Subject();
        this._onColorSelected = new Subject_1.Subject();
        this._onError = new Subject_1.Subject();
        this._onImageLoaded = new Subject_1.Subject();
        this._onImageDeleted = new Subject_1.Subject();
        this.onToDoDeleted$ = this._onToDoDeleted.asObservable();
        this.onColorSelected$ = this._onColorSelected.asObservable();
        this.onError$ = this._onError.asObservable();
        this.onImageLoaded$ = this._onImageLoaded.asObservable();
        this.onImageDeleted$ = this._onImageDeleted.asObservable();
    }
    AlertService.prototype.onToDoDeleted = function (toDo) {
        this._onToDoDeleted.next(toDo);
    };
    AlertService.prototype.onColorSelected = function (color) {
        this._onColorSelected.next(color);
    };
    AlertService.prototype.onError = function (error) {
        this._onError.next(error);
    };
    AlertService.prototype.onImageLoaded = function (image) {
        this._onImageLoaded.next(image);
    };
    AlertService.prototype.onImageDeleted = function (image) {
        this._onImageDeleted.next(image);
    };
    AlertService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map