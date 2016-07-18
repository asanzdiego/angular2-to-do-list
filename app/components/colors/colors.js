"use strict";
var Colores = (function () {
    function Colores() {
        this.allNameColors = [
            'Red', 'Pink', 'Purple', 'DeepPurple', 'Indigo', 'Blue',
            'LightBlue', 'Cyan', 'Teal', 'Green', 'LightGreen', 'Lime',
            'Yellow', 'Amber', 'Orange', 'DeepOrange', 'Brown', 'BlueGrey',
            'Grey', 'BlackAndWhite'
        ];
        this.reducedNameColors = [
            'Red', 'Pink', 'Purple', 'Indigo',
            'Blue', 'Cyan', 'Teal', 'Green',
            'Yellow', 'Amber', 'Orange', 'Grey'
        ];
        this.allShadowColors = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        this.highPriority = 800;
        this.normalPriority = 500;
        this.lowPriority = 300;
    }
    return Colores;
}());
exports.Colores = Colores;
//# sourceMappingURL=colors.js.map