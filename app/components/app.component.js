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
var to_do_service_1 = require('../services/to-do.service');
var alert_service_1 = require('../services/alert.service');
var web_storage_service_1 = require('../services/util/web-storage.service');
var random_id_generator_service_1 = require('../services/util/random-id-generator-service');
var core_2 = require('angular2-google-maps/core');
var to_do_list_component_1 = require('./to-do-list/to-do-list.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/components/app.component.html',
            directives: [
                to_do_list_component_1.ToDoListComponent
            ],
            providers: [
                to_do_service_1.ToDoService,
                alert_service_1.AlertService,
                web_storage_service_1.WebStorgeService,
                random_id_generator_service_1.RandomIdGeneratorService,
                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map