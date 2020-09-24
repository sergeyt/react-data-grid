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
import { SELECT_COLUMN_KEY } from './Columns';
import GroupCell from './GroupCell';
function GroupedRow(_a) {
    var { id, groupKey, viewportColumns, childRows, rowIdx, top, level, isExpanded, selectedCellIdx, isRowSelected, eventBus } = _a, props = __rest(_a, ["id", "groupKey", "viewportColumns", "childRows", "rowIdx", "top", "level", "isExpanded", "selectedCellIdx", "isRowSelected", "eventBus"]);
    // Select is always the first column
    const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;
    function selectGroup() {
        eventBus.dispatch('SelectCell', { rowIdx, idx: -1 });
    }
    return (React.createElement("div", Object.assign({ role: "row", "aria-level": level, "aria-expanded": isExpanded, className: clsx('rdg-row', 'rdg-group-row', `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, {
            'rdg-row-selected': isRowSelected,
            'rdg-group-row-selected': selectedCellIdx === -1 // Select row if there is no selected cell
        }), onClick: selectGroup, style: { top } }, props), viewportColumns.map(column => (React.createElement(GroupCell, { key: column.key, id: id, rowIdx: rowIdx, groupKey: groupKey, childRows: childRows, isExpanded: isExpanded, isRowSelected: isRowSelected, isCellSelected: selectedCellIdx === column.idx, eventBus: eventBus, column: column, groupColumnIndex: idx })))));
}
export default memo(GroupedRow);
//# sourceMappingURL=GroupRow.js.map