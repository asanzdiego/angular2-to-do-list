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
var alert_service_1 = require('../../services/alert.service');
var ImageComponent = (function () {
    function ImageComponent(_alertService) {
        this._alertService = _alertService;
    }
    ImageComponent.prototype.selectColor = function (color) {
        this._alertService.onColorSelected(color);
    };
    ImageComponent.prototype.onDrop = function (event) {
        event.stopPropagation();
        event.preventDefault();
        // console.log("onDrop", event);
        var file = event.dataTransfer.files[0];
        this._processFile(file);
    };
    ImageComponent.prototype.onDragOver = function (event) {
        event.stopPropagation();
        event.preventDefault();
        // console.log("onDragOver", event);
    };
    ImageComponent.prototype.onChangeFile = function (event) {
        // console.log("onChangeFile", event);
        var file = event.target.files[0];
        this._processFile(file);
    };
    ImageComponent.prototype._processFile = function (file) {
        if (!file.type.match('image.*')) {
            this._alertService.onError("El fichero subido no es una imagen");
        }
        else {
            var reader_1 = new FileReader();
            var that_1 = this;
            reader_1.onloadend = function () {
                // console.log("reader.result", reader.result);
                that_1._alertService.onImageLoaded(reader_1.result);
            };
            reader_1.readAsDataURL(file);
        }
    };
    ImageComponent.prototype.deleteImage = function () {
        this._alertService.onImageDeleted(null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageComponent.prototype, "image", void 0);
    ImageComponent = __decorate([
        core_1.Component({
            selector: 'images',
            templateUrl: 'app/components/image/image.component.html'
        }), 
        __metadata('design:paramtypes', [alert_service_1.AlertService])
    ], ImageComponent);
    return ImageComponent;
}());
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=image.component.js.map