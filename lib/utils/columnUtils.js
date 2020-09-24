import { ToggleGroupFormatter } from '../formatters';
import { SELECT_COLUMN_KEY } from '../Columns';
export function getColumnMetrics(metrics) {
    let left = 0;
    let totalWidth = 0;
    let allocatedWidths = 0;
    let unassignedColumnsCount = 0;
    let lastFrozenColumnIndex = -1;
    let totalFrozenColumnWidth = 0;
    const { rawGroupBy } = metrics;
    const columns = metrics.rawColumns.map(metricsColumn => {
        let width = getSpecifiedWidth(metricsColumn, metrics.columnWidths, metrics.viewportWidth);
        if (width === undefined) {
            unassignedColumnsCount++;
        }
        else {
            width = clampColumnWidth(width, metricsColumn, metrics.minColumnWidth);
            allocatedWidths += width;
        }
        const column = Object.assign(Object.assign({}, metricsColumn), { width });
        if (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(column.key)) {
            column.frozen = true;
            column.rowGroup = true;
        }
        if (column.frozen) {
            lastFrozenColumnIndex++;
        }
        return column;
    });
    columns.sort(({ key: aKey, frozen: frozenA }, { key: bKey, frozen: frozenB }) => {
        // Sort select column first:
        if (aKey === SELECT_COLUMN_KEY)
            return -1;
        if (bKey === SELECT_COLUMN_KEY)
            return 1;
        // Sort grouped columns second, following the groupBy order:
        if (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(aKey)) {
            if (rawGroupBy.includes(bKey)) {
                return rawGroupBy.indexOf(aKey) - rawGroupBy.indexOf(bKey);
            }
            return -1;
        }
        if (rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(bKey))
            return 1;
        // Sort frozen columns third:
        if (frozenA) {
            if (frozenB)
                return 0;
            return -1;
        }
        if (frozenB)
            return 1;
        // Sort other columns last:
        return 0;
    });
    const unallocatedWidth = metrics.viewportWidth - allocatedWidths;
    const unallocatedColumnWidth = Math.max(Math.floor(unallocatedWidth / unassignedColumnsCount), metrics.minColumnWidth);
    // Filter rawGroupBy and ignore keys that do not match the columns prop
    const groupBy = [];
    const calculatedColumns = columns.map((column, idx) => {
        var _a, _b, _c, _d, _e;
        // Every column should have a valid width as this stage
        const width = (_a = column.width) !== null && _a !== void 0 ? _a : clampColumnWidth(unallocatedColumnWidth, column, metrics.minColumnWidth);
        const newColumn = Object.assign(Object.assign({}, column), { idx,
            width,
            left, sortable: (_b = column.sortable) !== null && _b !== void 0 ? _b : metrics.defaultSortable, resizable: (_c = column.resizable) !== null && _c !== void 0 ? _c : metrics.defaultResizable, formatter: (_d = column.formatter) !== null && _d !== void 0 ? _d : metrics.defaultFormatter });
        if (newColumn.rowGroup) {
            groupBy.push(column.key);
            newColumn.groupFormatter = (_e = column.groupFormatter) !== null && _e !== void 0 ? _e : ToggleGroupFormatter;
        }
        totalWidth += width;
        left += width;
        return newColumn;
    });
    if (lastFrozenColumnIndex !== -1) {
        const lastFrozenColumn = calculatedColumns[lastFrozenColumnIndex];
        lastFrozenColumn.isLastFrozenColumn = true;
        totalFrozenColumnWidth = lastFrozenColumn.left + lastFrozenColumn.width;
    }
    return {
        columns: calculatedColumns,
        lastFrozenColumnIndex,
        totalFrozenColumnWidth,
        totalColumnWidth: totalWidth,
        groupBy
    };
}
function getSpecifiedWidth({ key, width }, columnWidths, viewportWidth) {
    if (columnWidths.has(key)) {
        // Use the resized width if available
        return columnWidths.get(key);
    }
    if (typeof width === 'number') {
        return width;
    }
    if (typeof width === 'string' && /^\d+%$/.test(width)) {
        return Math.floor(viewportWidth * parseInt(width, 10) / 100);
    }
    return undefined;
}
function clampColumnWidth(width, { minWidth, maxWidth }, minColumnWidth) {
    width = Math.max(width, minWidth !== null && minWidth !== void 0 ? minWidth : minColumnWidth);
    if (typeof maxWidth === 'number') {
        return Math.min(width, maxWidth);
    }
    return width;
}
// Logic extented to allow for functions to be passed down in column.editable
// this allows us to decide whether we can be editing from a cell level
export function canEdit(column, row) {
    var _a, _b;
    if (typeof column.editable === 'function') {
        return column.editable(row);
    }
    return Boolean((_b = (_a = column.editor) !== null && _a !== void 0 ? _a : column.editor2) !== null && _b !== void 0 ? _b : column.editable);
}
export function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
    let left = 0;
    let frozen = 0;
    for (let i = 0; i < idx; i++) {
        const column = columns[i];
        if (column) {
            if (column.width) {
                left += column.width;
            }
            if (column.frozen) {
                frozen += column.width;
            }
        }
    }
    const selectedColumn = columns[idx];
    if (selectedColumn) {
        const scrollLeft = left - frozen - currentScrollLeft;
        const scrollRight = left + selectedColumn.width - currentScrollLeft;
        if (scrollLeft < 0) {
            return scrollLeft;
        }
        if (scrollRight > currentClientWidth) {
            return scrollRight - currentClientWidth;
        }
    }
    return 0;
}
//# sourceMappingURL=columnUtils.js.map