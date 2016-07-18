"use strict";
var Colors = (function () {
    function Colors() {
        this.allNameColors = [
            'red', 'pink', 'purple', 'deepPurple', 'indigo', 'blue',
            'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime',
            'yellow', 'amber', 'orange', 'deepOrange', 'brown', 'blueGrey',
            'grey', 'blackAndWhite'
        ];
        this.reducedNameColors = [
            'red', 'pink', 'purple', 'indigo',
            'blue', 'cyan', 'teal', 'green',
            'yellow', 'amber', 'orange', 'grey'
        ];
        this.allShadowColors = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        this.highPriority = 800;
        this.normalPriority = 500;
        this.lowPriority = 300;
    }
    return Colors;
}());
exports.Colors = Colors;
//# sourceMappingURL=colors.component.js.map