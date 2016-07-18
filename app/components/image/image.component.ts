
import { Component, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'images',
    templateUrl: 'app/components/image/image.component.html'
})
export class ImageComponent {

    @Input()
    image: string;

    constructor(private _alertService: AlertService) { }

    selectColor(color: string) {
        this._alertService.onColorSelected(color);
    }

    onDrop(event: any) {
        event.stopPropagation();
        event.preventDefault();
        // console.log("onDrop", event);
        let file = event.dataTransfer.files[0];
        this._processFile(file);
    }

    onDragOver(event: any) {
        event.stopPropagation();
        event.preventDefault();
        // console.log("onDragOver", event);
    }

    onChangeFile(event: any) {
        // console.log("onChangeFile", event);
        let file = event.target.files[0];
        this._processFile(file);
    }

    private _processFile(file: File) {
        if (!file.type.match('image.*')) {
            this._alertService.onError("El fichero subido no es una imagen");
        } else {
            let reader = new FileReader();
            let that = this;
            reader.onloadend = function() {
                // console.log("reader.result", reader.result);
                that._alertService.onImageLoaded(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    deleteImage() {
        this._alertService.onImageDeleted(null);
    }
}
