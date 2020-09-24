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
import React, { forwardRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { EditorContainer, EditorContainer2, EditorPortal } from './editors';
import { useCombinedRefs } from './hooks';
function EditCell(_a, ref) {
    var { className, column, row, rowIdx, editorPortalTarget, editorContainerProps, editor2Props, onKeyDown } = _a, props = __rest(_a, ["className", "column", "row", "rowIdx", "editorPortalTarget", "editorContainerProps", "editor2Props", "onKeyDown"]);
    const [dimensions, setDimensions] = useState(null);
    const cellRef = useCallback(node => {
        if (node !== null) {
            const { left, top } = node.getBoundingClientRect();
            setDimensions({ left, top });
        }
    }, []);
    const { cellClass } = column;
    className = clsx('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn
    }, 'rdg-cell-selected', 'rdg-cell-editing', typeof cellClass === 'function' ? cellClass(row) : cellClass, className);
    function getCellContent() {
        var _a, _b;
        if (dimensions === null)
            return;
        const { scrollTop: docTop, scrollLeft: docLeft } = (_a = document.scrollingElement) !== null && _a !== void 0 ? _a : document.documentElement;
        const { left, top } = dimensions;
        const gridLeft = left + docLeft;
        const gridTop = top + docTop;
        if (column.editor2 !== undefined) {
            return (React.createElement(EditorContainer2, Object.assign({}, editor2Props, { editorPortalTarget: editorPortalTarget, rowIdx: rowIdx, column: column, left: gridLeft, top: gridTop })));
        }
        const editor = (React.createElement(EditorContainer, Object.assign({}, editorContainerProps, { rowIdx: rowIdx, row: row, column: column, left: gridLeft, top: gridTop })));
        if (((_b = column.editorOptions) === null || _b === void 0 ? void 0 : _b.createPortal) !== false) {
            return (React.createElement(EditorPortal, { target: editorPortalTarget }, editor));
        }
        return editor;
    }
    return (React.createElement("div", Object.assign({ role: "gridcell", "aria-colindex": column.idx + 1, "aria-selected": true, ref: useCombinedRefs(cellRef, ref), className: className, style: {
            width: column.width,
            left: column.left
        }, onKeyDown: onKeyDown }, props), getCellContent()));
}
export default forwardRef(EditCell);
//# sourceMappingURL=EditCell.js.map