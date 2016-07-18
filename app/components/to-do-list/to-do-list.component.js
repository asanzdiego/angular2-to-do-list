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
var to_do_service_1 = require('../../services/to-do.service');
var alert_service_1 = require('../../services/alert.service');
var to_do_detail_component_1 = require('../to-do-detail/to-do-detail.component');
var ToDoListComponent = (function () {
    function ToDoListComponent(_toDoService, _alertService) {
        var _this = this;
        this._toDoService = _toDoService;
        this._alertService = _alertService;
        this.colors = new colors_1.Colors();
        this.reverseOrder = false;
        this.nameOrderIcon = '';
        this.dateOrderIcon = '';
        this.priorityOrderIcon = '';
        this._alertService.onToDoDeleted$.subscribe(function (toDo) { return _this.deleteToDo(toDo); });
    }
    ToDoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('ngOnInit');
        this._toDoService.list().then(function (toDoList) {
            _this.toDoList = toDoList;
            _this.orderByName();
        });
    };
    ToDoListComponent.prototype.selectToDo = function (toDo) {
        var _this = this;
        if (this.selectedToDo) {
            this.selectedToDo.animatedClass = 'zoomOutLeft';
            setTimeout(function (args) {
                toDo.animatedClass = 'zoomInLeft';
                _this.selectedToDo = toDo;
            }, 1000);
        }
        else {
            toDo.animatedClass = 'zoomInLeft';
            this.selectedToDo = toDo;
        }
    };
    ToDoListComponent.prototype.newToDo = function () {
        // console.log("newToDo");
        var newToDo = {};
        newToDo.editable = true;
        newToDo.isAllDay = true;
        newToDo.editable = true;
        newToDo.color = 'yellow';
        newToDo.priority = this.colors.lowPriorityShadow;
        // el politécnico de la universidad de Alcalá
        newToDo.latitude = 40.5131335303265;
        newToDo.longitude = -3.3496124744415283;
        this.toDoList.push(newToDo);
        this.selectToDo(newToDo);
    };
    ToDoListComponent.prototype.deleteToDo = function (toDo) {
        var _this = this;
        // console.log("deleteToDo", toDo);
        this.selectedToDo.animatedClass = 'zoomOutLeft';
        setTimeout(function (args) {
            _this.selectedToDo = null;
            _this._toDoService.delete(toDo)
                .then(function (toDoList) { return _this.toDoList = toDoList; });
        }, 1000);
    };
    ToDoListComponent.prototype.orderByName = function () {
        this.toDoList.sort(function (a, b) {
            var stringA = a.name || '';
            var stringB = b.name || '';
            return stringA.localeCompare(stringB);
        });
        if (this.reverseOrder) {
            this.toDoList.reverse();
            this.nameOrderIcon = 'fa fa-chevron-up';
        }
        else {
            this.nameOrderIcon = 'fa fa-chevron-down';
        }
        this.reverseOrder = !this.reverseOrder;
        this.dateOrderIcon = '';
        this.priorityOrderIcon = '';
    };
    ToDoListComponent.prototype.orderByDate = function () {
        this.toDoList.sort(function (a, b) {
            var dateA = new Date("" + a.date);
            var dateB = new Date("" + b.date);
            return dateA.getTime() - dateB.getTime();
        });
        if (this.reverseOrder) {
            this.toDoList.reverse();
            this.dateOrderIcon = 'fa fa-chevron-up';
        }
        else {
            this.dateOrderIcon = 'fa fa-chevron-down';
        }
        this.reverseOrder = !this.reverseOrder;
        this.nameOrderIcon = '';
        this.priorityOrderIcon = '';
    };
    ToDoListComponent.prototype.orderByPriority = function () {
        this.toDoList.sort(function (a, b) {
            var priorityA = a.priority || 0;
            var priorityB = b.priority || 0;
            return priorityA - priorityB;
        });
        if (this.reverseOrder) {
            this.toDoList.reverse();
            this.priorityOrderIcon = 'fa fa-chevron-up';
        }
        else {
            this.priorityOrderIcon = 'fa fa-chevron-down';
        }
        this.reverseOrder = !this.reverseOrder;
        this.nameOrderIcon = '';
        this.dateOrderIcon = '';
    };
    ToDoListComponent = __decorate([
        core_1.Component({
            selector: 'to-do-list',
            templateUrl: 'app/components/to-do-list/to-do-list.component.html',
            directives: [
                to_do_detail_component_1.ToDoDetailComponent
            ]
        }), 
        __metadata('design:paramtypes', [to_do_service_1.ToDoService, alert_service_1.AlertService])
    ], ToDoListComponent);
    return ToDoListComponent;
}());
exports.ToDoListComponent = ToDoListComponent;
//# sourceMappingURL=to-do-list.component.js.map