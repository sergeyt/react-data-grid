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
import { wrapEvent } from './utils';
function Row(_a) {
    var { cellRenderer: CellRenderer = Cell, className, eventBus, rowIdx, isRowSelected, lastFrozenColumnIndex, copiedCellIdx, draggedOverCellIdx, row, viewportColumns, selectedCellProps, onRowClick, rowClass, setDraggedOverRowIdx, onMouseEnter, top, 'aria-rowindex': ariaRowIndex, 'aria-selected': ariaSelected } = _a, props = __rest(_a, ["cellRenderer", "className", "eventBus", "rowIdx", "isRowSelected", "lastFrozenColumnIndex", "copiedCellIdx", "draggedOverCellIdx", "row", "viewportColumns", "selectedCellProps", "onRowClick", "rowClass", "setDraggedOverRowIdx", "onMouseEnter", "top", 'aria-rowindex', 'aria-selected']);
    function handleDragEnter() {
        setDraggedOverRowIdx === null || setDraggedOverRowIdx === void 0 ? void 0 : setDraggedOverRowIdx(rowIdx);
    }
    className = clsx('rdg-row', `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, { 'rdg-row-selected': isRowSelected }, rowClass === null || rowClass === void 0 ? void 0 : rowClass(row), className);
    return (React.createElement("div", Object.assign({ role: "row", "aria-rowindex": ariaRowIndex, "aria-selected": ariaSelected, className: className, onMouseEnter: wrapEvent(handleDragEnter, onMouseEnter), style: { top } }, props), viewportColumns.map(column => (React.createElement(CellRenderer, { key: column.key, rowIdx: rowIdx, column: column, lastFrozenColumnIndex: lastFrozenColumnIndex, row: row, isCopied: copiedCellIdx === column.idx, isDraggedOver: draggedOverCellIdx === column.idx, isRowSelected: isRowSelected, eventBus: eventBus, selectedCellProps: (selectedCellProps === null || selectedCellProps === void 0 ? void 0 : selectedCellProps.idx) === column.idx ? selectedCellProps : undefined, onRowClick: onRowClick })))));
}
export default memo(Row);
//# sourceMappingURL=Row.js.map