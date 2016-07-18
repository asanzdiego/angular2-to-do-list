import { Component, Input, OnChanges } from '@angular/core';
import { ToDo } from '../../models/to-do';
import { Colors } from '../../util/colors';
import { ColorsComponent } from '../colors/colors.component';
import { ImageComponent } from '../image/image.component';
import { ToDoService } from '../../services/to-do.service';
import { AlertService } from '../../services/alert.service';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
    selector: 'to-do-detail',
    templateUrl: 'app/components/to-do-detail/to-do-detail.component.html',
    directives: [
        ColorsComponent,
        ImageComponent,
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES
    ]
})
export class ToDoDetailComponent implements OnChanges {

    colors = new Colors();
    mensaje = '';
    error = '';

    @Input()
    toDo: ToDo;

    constructor(
        private _toDoService: ToDoService,
        private _alertService: AlertService) {

        this._alertService.onColorSelected$.subscribe(
            color => this.toDo.color = color);

        this._alertService.onError$.subscribe(
            error => this.error = error);

        this._alertService.onImageLoaded$.subscribe(
            image => {
                this.toDo.image = image;
                this.autoSaveToDo();
            });

        this._alertService.onImageDeleted$.subscribe(
            image => {
                this.toDo.image = null;
                this.autoSaveToDo();
            });
    }

    ngOnChanges() {
        // console.log('OnChanges', this.toDo);
        if (!this.toDo.id) {
            if (navigator.geolocation) {
                let that = this;
                navigator.geolocation.getCurrentPosition(function(position) {
                    that.toDo.latitude = position.coords.latitude;
                    that.toDo.longitude = position.coords.longitude;
                }, function() {
                    that.error = "El servicio de geolocalización ha fallado.";
                });
            } else {
                this.error = "Tu navegador no soporta geolocalización.";
            }
        }
        this.error = '';
    }

    editToDo() {
        this.toDo.editable = true;
    }

    deleteToDo() {
        // console.log("deleteToDo");
        this._alertService.onToDoDeleted(this.toDo);
    }

    autoSaveDate(event: any) {
        //console.log("autoSaveDate", event);
        this.toDo.date = event.target.value;
        this._saveToDo("autosalvado");
    }

    autoSaveToDo() {
        // console.log("autoSaveToDo");
        this._saveToDo("autosalvado");
    }

    saveToDo() {
        // console.log("saveToDo");
        this.toDo.editable = false;
        this._saveToDo("salvado");
    }

    private _saveToDo(mensaje: string) {
        console.log("this.toDo.date", this.toDo.date);
        this.toDo.start = this._formatTime(this.toDo.hhStart, this.toDo.mmStart);
        this.toDo.end = this._formatTime(this.toDo.hhEnd, this.toDo.mmEnd);
        //console.log("this.toDo.start", this.toDo.start);
        //console.log("this.toDo.end", this.toDo.end);
        this._toDoService.save(this.toDo)
            .then(toDo => {
                this.mensaje = mensaje;
                this.toDo = <ToDo>toDo;
                setTimeout(args => this.mensaje = "", 1000);
            });
    }

    private _formatTime(hh: number, mm: number) {
        if (!hh && hh != 0) {
            return ""
        }
        return this._formatTime2digits(hh) + ":" + this._formatTime2digits(mm);
    }

    private _formatTime2digits(time: number) {
        if (!time) {
            return "00"
        }
        if (time < 0) {
            return "00";
        }
        if (time < 10) {
            return "0" + time;
        }
        return "" + time;
    }

    selectIsAllDay(isAllDay: boolean) {
        // console.log('selectIsAllDay', isAllDay);
        this.toDo.isAllDay = isAllDay;
        this.autoSaveToDo();
    }

    classIsAllDay(isAllDay: boolean) {
        // console.log('classIsAllDay', isAllDay);
        if (this.toDo.isAllDay === isAllDay) {
            return "blue text-white active";
        } else {
            return "";
        }
    }

    selectPriority(priority: number) {
        // console.log('selectPriority', priority);
        this.toDo.priority = priority;
        this.autoSaveToDo();
    }

    classPriority(priority: number) {
        // console.log('classPriority', priority);
        // console.log('this.toDo.priority', this.toDo.priority);
        if (this.toDo.priority === priority) {
            return "blue text-white active";
        } else {
            return "";
        }
    }

    closeError() {
        this.error = "";
    }

    markerDragEnd(event: any) {
        // console.log("markerDragEnd", event);
        if (event.coords) {
            this.toDo.latitude = event.coords.lat;
            this.toDo.longitude = event.coords.lng;
            this.autoSaveToDo();
        }
    }
}
