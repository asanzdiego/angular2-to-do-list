import { Component } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { AlertService } from '../services/alert.service';
import { WebStorgeService } from '../services/util/web-storage.service';
import { RandomIdGeneratorService } from '../services/util/random-id-generator-service';
import { ANGULAR2_GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [
        ToDoListComponent
    ],
    providers: [
        ToDoService,
        AlertService,
        WebStorgeService,
        RandomIdGeneratorService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS
    ]
})
export class AppComponent {

}
