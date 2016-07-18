import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/to-do';
import { Colors } from '../../util/colors';
import { ToDoService } from '../../services/to-do.service';
import { AlertService } from '../../services/alert.service';
import { ToDoDetailComponent } from '../to-do-detail/to-do-detail.component';

@Component({
    selector: 'to-do-list',
    templateUrl: 'app/components/to-do-list/to-do-list.component.html',
    directives: [
        ToDoDetailComponent
    ]
})
export class ToDoListComponent implements OnInit {

    colors = new Colors();
    toDoList: ToDo[];
    selectedToDo: ToDo;

    reverseOrder = false;

    nameOrderIcon = '';
    dateOrderIcon = '';
    priorityOrderIcon = '';

    constructor(
        private _toDoService: ToDoService,
        private _alertService: AlertService) {

        this._alertService.onToDoDeleted$.subscribe(
            toDo => this.deleteToDo(toDo));
    }

    ngOnInit() {
        // console.log('ngOnInit');
        this._toDoService.list().then(toDoList => {
            this.toDoList = <ToDo[]>toDoList;
            this.orderByName();
        });
    }

    selectToDo(toDo: ToDo) {
        if (this.selectedToDo) {
            this.selectedToDo.animatedClass = 'zoomOutLeft';
            setTimeout(args => {
                toDo.animatedClass = 'zoomInLeft';
                this.selectedToDo = toDo;
            }, 1000);
        } else {
            toDo.animatedClass = 'zoomInLeft';
            this.selectedToDo = toDo;
        }
    }

    newToDo() {
        // console.log("newToDo");
        let newToDo: ToDo = <ToDo>{};
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
    }

    private deleteToDo(toDo: ToDo) {
        // console.log("deleteToDo", toDo);
        this.selectedToDo.animatedClass = 'zoomOutLeft';
        setTimeout(args => {
            this.selectedToDo = null;
            this._toDoService.delete(toDo)
                .then(toDoList => this.toDoList = <ToDo[]>toDoList);
        }, 1000);
    }

    orderByName() {
        this.toDoList.sort((a, b) => {
            let stringA = a.name || '';
            let stringB = b.name || '';
            return stringA.localeCompare(stringB)
        })
        if (this.reverseOrder) {
            this.toDoList.reverse();
            this.nameOrderIcon = 'fa fa-chevron-up';
        } else {
            this.nameOrderIcon = 'fa fa-chevron-down';
        }
        this.reverseOrder = !this.reverseOrder;
        this.dateOrderIcon = '';
        this.priorityOrderIcon = '';
    }

    orderByDate() {
        this.toDoList.sort((a, b) => {
            let dateA = new Date("" + a.date);
            let dateB = new Date("" + b.date);
            return dateA.getTime() - dateB.getTime();
        })
        if (this.reverseOrder) {
            this.toDoList.reverse();
            this.dateOrderIcon = 'fa fa-chevron-up';
        } else {
            this.dateOrderIcon = 'fa fa-chevron-down';
        }
        this.reverseOrder = !this.reverseOrder;
        this.nameOrderIcon = '';
        this.priorityOrderIcon = '';
    }

    orderByPriority() {
        this.toDoList.sort((a, b) => {
            let priorityA = a.priority || 0;
            let priorityB = b.priority || 0;
            return priorityA - priorityB;
        })
        if (this.reverseOrder) {
            this.toDoList.reverse();
            this.priorityOrderIcon = 'fa fa-chevron-up';
        } else {
            this.priorityOrderIcon = 'fa fa-chevron-down';
        }
        this.reverseOrder = !this.reverseOrder;
        this.nameOrderIcon = '';
        this.dateOrderIcon = '';
    }
}
