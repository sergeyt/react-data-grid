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
import React from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '../hooks';
export default function Editor2Container(_a) {
    var _b;
    var { row, column, onRowChange, editorPortalTarget } = _a, props = __rest(_a, ["row", "column", "onRowChange", "editorPortalTarget"]);
    const onClickCapture = useClickOutside(() => onRowChange(row, true));
    if (column.editor2 === undefined)
        return null;
    const editor = (React.createElement("div", { onClickCapture: onClickCapture },
        React.createElement(column.editor2, Object.assign({ row: row, column: column, onRowChange: onRowChange, editorPortalTarget: editorPortalTarget }, props))));
    if ((_b = column.editorOptions) === null || _b === void 0 ? void 0 : _b.createPortal) {
        return createPortal(editor, editorPortalTarget);
    }
    return editor;
}
//# sourceMappingURL=Editor2Container.js.map