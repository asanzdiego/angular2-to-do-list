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
var colors_1 = require('../../util/colors');
var colors_component_1 = require('../colors/colors.component');
var image_component_1 = require('../image/image.component');
var to_do_service_1 = require('../../services/to-do.service');
var alert_service_1 = require('../../services/alert.service');
var core_2 = require('angular2-google-maps/core');
var ToDoDetailComponent = (function () {
    function ToDoDetailComponent(_toDoService, _alertService) {
        var _this = this;
        this._toDoService = _toDoService;
        this._alertService = _alertService;
        this.colors = new colors_1.Colors();
        this.mensaje = '';
        this.error = '';
        this._alertService.onColorSelected$.subscribe(function (color) { return _this.toDo.color = color; });
        this._alertService.onError$.subscribe(function (error) { return _this.error = error; });
        this._alertService.onImageLoaded$.subscribe(function (image) {
            _this.toDo.image = image;
            _this.autoSaveToDo();
        });
        this._alertService.onImageDeleted$.subscribe(function (image) {
            _this.toDo.image = null;
            _this.autoSaveToDo();
        });
    }
    ToDoDetailComponent.prototype.ngOnChanges = function () {
        // console.log('OnChanges', this.toDo);
        if (!this.toDo.id) {
            if (navigator.geolocation) {
                var that_1 = this;
                navigator.geolocation.getCurrentPosition(function (position) {
                    that_1.toDo.latitude = position.coords.latitude;
                    that_1.toDo.longitude = position.coords.longitude;
                }, function () {
                    that_1.error = "El servicio de geolocalización ha fallado.";
                });
            }
            else {
                this.error = "Tu navegador no soporta geolocalización.";
            }
        }
        this.error = '';
    };
    ToDoDetailComponent.prototype.editToDo = function () {
        this.toDo.editable = true;
    };
    ToDoDetailComponent.prototype.deleteToDo = function () {
        // console.log("deleteToDo");
        this._alertService.onToDoDeleted(this.toDo);
    };
    ToDoDetailComponent.prototype.autoSaveDate = function (event) {
        //console.log("autoSaveDate", event);
        this.toDo.date = event.target.value;
        this._saveToDo("autosalvado");
    };
    ToDoDetailComponent.prototype.autoSaveToDo = function () {
        // console.log("autoSaveToDo");
        this._saveToDo("autosalvado");
    };
    ToDoDetailComponent.prototype.saveToDo = function () {
        // console.log("saveToDo");
        this.toDo.editable = false;
        this._saveToDo("salvado");
    };
    ToDoDetailComponent.prototype._saveToDo = function (mensaje) {
        var _this = this;
        console.log("this.toDo.date", this.toDo.date);
        this.toDo.start = this._formatTime(this.toDo.hhStart, this.toDo.mmStart);
        this.toDo.end = this._formatTime(this.toDo.hhEnd, this.toDo.mmEnd);
        //console.log("this.toDo.start", this.toDo.start);
        //console.log("this.toDo.end", this.toDo.end);
        this._toDoService.save(this.toDo)
            .then(function (toDo) {
            _this.mensaje = mensaje;
            _this.toDo = toDo;
            setTimeout(function (args) { return _this.mensaje = ""; }, 1000);
        });
    };
    ToDoDetailComponent.prototype._formatTime = function (hh, mm) {
        if (!hh && hh != 0) {
            return "";
        }
        return this._formatTime2digits(hh) + ":" + this._formatTime2digits(mm);
    };
    ToDoDetailComponent.prototype._formatTime2digits = function (time) {
        if (!time) {
            return "00";
        }
        if (time < 0) {
            return "00";
        }
        if (time < 10) {
            return "0" + time;
        }
        return "" + time;
    };
    ToDoDetailComponent.prototype.selectIsAllDay = function (isAllDay) {
        // console.log('selectIsAllDay', isAllDay);
        this.toDo.isAllDay = isAllDay;
        this.autoSaveToDo();
    };
    ToDoDetailComponent.prototype.classIsAllDay = function (isAllDay) {
        // console.log('classIsAllDay', isAllDay);
        if (this.toDo.isAllDay === isAllDay) {
            return "blue text-white active";
        }
        else {
            return "";
        }
    };
    ToDoDetailComponent.prototype.selectPriority = function (priority) {
        // console.log('selectPriority', priority);
        this.toDo.priority = priority;
        this.autoSaveToDo();
    };
    ToDoDetailComponent.prototype.classPriority = function (priority) {
        // console.log('classPriority', priority);
        // console.log('this.toDo.priority', this.toDo.priority);
        if (this.toDo.priority === priority) {
            return "blue text-white active";
        }
        else {
            return "";
        }
    };
    ToDoDetailComponent.prototype.closeError = function () {
        this.error = "";
    };
    ToDoDetailComponent.prototype.markerDragEnd = function (event) {
        // console.log("markerDragEnd", event);
        if (event.coords) {
            this.toDo.latitude = event.coords.lat;
            this.toDo.longitude = event.coords.lng;
            this.autoSaveToDo();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToDoDetailComponent.prototype, "toDo", void 0);
    ToDoDetailComponent = __decorate([
        core_1.Component({
            selector: 'to-do-detail',
            templateUrl: 'app/components/to-do-detail/to-do-detail.component.html',
            directives: [
                colors_component_1.ColorsComponent,
                image_component_1.ImageComponent,
                core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES
            ]
        }), 
        __metadata('design:paramtypes', [to_do_service_1.ToDoService, alert_service_1.AlertService])
    ], ToDoDetailComponent);
    return ToDoDetailComponent;
}());
exports.ToDoDetailComponent = ToDoDetailComponent;
//# sourceMappingURL=to-do-detail.component.js.map