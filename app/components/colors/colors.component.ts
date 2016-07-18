import { Component } from '@angular/core';
import { Colors } from '../../util/colors';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'colors',
    templateUrl: 'app/components/colors/colors.component.html'
})
export class ColorsComponent {

    colors = new Colors();

    constructor(private _alertService: AlertService) { }

    selectColor(color: string) {
        this._alertService.onColorSelected(color);
    }
}
