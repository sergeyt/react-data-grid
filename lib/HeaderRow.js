import React, { useCallback, memo } from 'react';
import HeaderCell from './HeaderCell';
import { assertIsValidKey } from './utils';
function HeaderRow({ columns, rows, rowKey, onSelectedRowsChange, allRowsSelected, onColumnResize, sortColumn, sortDirection, onSort }) {
    const handleAllRowsSelectionChange = useCallback((checked) => {
        if (!onSelectedRowsChange)
            return;
        assertIsValidKey(rowKey);
        const newSelectedRows = new Set();
        if (checked) {
            for (const row of rows) {
                newSelectedRows.add(row[rowKey]);
            }
        }
        onSelectedRowsChange(newSelectedRows);
    }, [onSelectedRowsChange, rows, rowKey]);
    return (React.createElement("div", { role: "row", "aria-rowindex": 1, className: "rdg-header-row" }, columns.map(column => {
        return (React.createElement(HeaderCell, { key: column.key, column: column, onResize: onColumnResize, allRowsSelected: allRowsSelected, onAllRowsSelectionChange: handleAllRowsSelectionChange, onSort: onSort, sortColumn: sortColumn, sortDirection: sortDirection }));
    })));
}
export default memo(HeaderRow);
//# sourceMappingURL=HeaderRow.js.map