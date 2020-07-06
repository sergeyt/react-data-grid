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
import React, { memo } from 'react';
import clsx from 'clsx';
import Cell from './Cell';
import { preventDefault, wrapEvent } from './utils';
function Row(_a) {
    var { cellRenderer: CellRenderer = Cell, className, eventBus, rowIdx, isRowSelected, lastFrozenColumnIndex, onRowClick, row, viewportColumns, onDragEnter, onDragOver, onDrop, rowClass, top } = _a, props = __rest(_a, ["cellRenderer", "className", "eventBus", "rowIdx", "isRowSelected", "lastFrozenColumnIndex", "onRowClick", "row", "viewportColumns", "onDragEnter", "onDragOver", "onDrop", "rowClass", "top"]);
    function handleDragEnter(event) {
        // Prevent default to allow drop
        event.preventDefault();
        eventBus.dispatch('DRAG_ENTER', rowIdx);
    }
    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }
    className = clsx('rdg-row', `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, { 'rdg-row-selected': isRowSelected }, rowClass === null || rowClass === void 0 ? void 0 : rowClass(row), className);
    // Regarding onDrop: the default in Firefox is to treat data in dataTransfer as a URL,
    // and perform navigation on it, even if the data type used is 'text'.
    // To bypass this, we need to capture and prevent the drop event.
    return (React.createElement("div", Object.assign({ className: className, onDragEnter: wrapEvent(handleDragEnter, onDragEnter), onDragOver: wrapEvent(handleDragOver, onDragOver), onDrop: wrapEvent(preventDefault, onDrop), style: { top } }, props), viewportColumns.map(column => (React.createElement(CellRenderer, { key: column.key, rowIdx: rowIdx, column: column, lastFrozenColumnIndex: lastFrozenColumnIndex, row: row, isRowSelected: isRowSelected, eventBus: eventBus, onRowClick: onRowClick })))));
}
export default memo(Row);
//# sourceMappingURL=Row.js.map