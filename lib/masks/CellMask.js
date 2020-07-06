var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
import clsx from 'clsx';
export default forwardRef(function CellMask(_a, ref) {
    var { width, height, top, left, zIndex, className } = _a, props = __rest(_a, ["width", "height", "top", "left", "zIndex", "className"]);
    return (React.createElement("div", Object.assign({ className: clsx('rdg-cell-mask', className), style: {
            height,
            width,
            zIndex,
            transform: `translate(${left}px, ${top}px)`
        }, "data-test": "cell-mask", ref: ref }, props)));
});
//# sourceMappingURL=CellMask.js.map