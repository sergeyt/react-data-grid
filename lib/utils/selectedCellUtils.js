import { canEdit } from './columnUtils';
export function isSelectedCellEditable({ selectedPosition, columns, rows, onCheckCellIsEditable, isGroupRow }) {
    const column = columns[selectedPosition.idx];
    const row = rows[selectedPosition.rowIdx];
    if (column.rowGroup === true || isGroupRow(row))
        return false;
    const isCellEditable = onCheckCellIsEditable ? onCheckCellIsEditable(Object.assign({ row, column }, selectedPosition)) : true;
    return isCellEditable && canEdit(column, row);
}
export function getNextSelectedCellPosition({ cellNavigationMode, columns, rowsCount, nextPosition }) {
    if (cellNavigationMode !== 'NONE') {
        const { idx, rowIdx } = nextPosition;
        const columnsCount = columns.length;
        const isAfterLastColumn = idx === columnsCount;
        const isBeforeFirstColumn = idx === -1;
        if (isAfterLastColumn) {
            if (cellNavigationMode === 'CHANGE_ROW') {
                const isLastRow = rowIdx === rowsCount - 1;
                if (!isLastRow) {
                    return {
                        idx: 0,
                        rowIdx: rowIdx + 1
                    };
                }
            }
            else if (cellNavigationMode === 'LOOP_OVER_ROW') {
                return {
                    rowIdx,
                    idx: 0
                };
            }
        }
        else if (isBeforeFirstColumn) {
            if (cellNavigationMode === 'CHANGE_ROW') {
                const isFirstRow = rowIdx === 0;
                if (!isFirstRow) {
                    return {
                        rowIdx: rowIdx - 1,
                        idx: columnsCount - 1
                    };
                }
            }
            else if (cellNavigationMode === 'LOOP_OVER_ROW') {
                return {
                    rowIdx,
                    idx: columnsCount - 1
                };
            }
        }
    }
    return nextPosition;
}
export function canExitGrid({ cellNavigationMode, columns, rowsCount, selectedPosition: { rowIdx, idx }, shiftKey }) {
    // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
    // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
    if (cellNavigationMode === 'NONE' || cellNavigationMode === 'CHANGE_ROW') {
        const atLastCellInRow = idx === columns.length - 1;
        const atFirstCellInRow = idx === 0;
        const atLastRow = rowIdx === rowsCount - 1;
        const atFirstRow = rowIdx === 0;
        return shiftKey ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
    }
    return false;
}
//# sourceMappingURL=selectedCellUtils.js.map