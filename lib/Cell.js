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
import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { preventDefault, wrapEvent } from './utils';
function Cell(_a, ref) {
    var { className, column, isRowSelected, lastFrozenColumnIndex, row, rowIdx, eventBus, onRowClick, onClick, onDoubleClick, onContextMenu, onDragOver } = _a, props = __rest(_a, ["className", "column", "isRowSelected", "lastFrozenColumnIndex", "row", "rowIdx", "eventBus", "onRowClick", "onClick", "onDoubleClick", "onContextMenu", "onDragOver"]);
    function selectCell(openEditor) {
        eventBus.dispatch('SELECT_CELL', { idx: column.idx, rowIdx }, openEditor);
    }
    function handleCellClick() {
        selectCell();
        onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(rowIdx, row, column);
    }
    function handleCellContextMenu() {
        selectCell();
    }
    function handleCellDoubleClick() {
        selectCell(true);
    }
    function onRowSelectionChange(checked, isShiftClick) {
        eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
    }
    const { cellClass } = column;
    className = clsx('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    }, typeof cellClass === 'function' ? cellClass(row) : cellClass, className);
    return (React.createElement("div", Object.assign({ ref: ref, className: className, style: {
            width: column.width,
            left: column.left
        }, onClick: wrapEvent(handleCellClick, onClick), onDoubleClick: wrapEvent(handleCellDoubleClick, onDoubleClick), onContextMenu: wrapEvent(handleCellContextMenu, onContextMenu), onDragOver: wrapEvent(preventDefault, onDragOver) }, props),
        React.createElement(column.formatter, { column: column, rowIdx: rowIdx, row: row, isRowSelected: isRowSelected, onRowSelectionChange: onRowSelectionChange })));
}
export default memo(forwardRef(Cell));
//# sourceMappingURL=Cell.js.map