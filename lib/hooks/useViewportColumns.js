import { useMemo } from 'react';
import { getColumnMetrics, getHorizontalRangeToRender, getViewportColumns } from '../utils';
export function useViewportColumns({ columns: rawColumns, minColumnWidth, columnWidths, viewportWidth, defaultFormatter, scrollLeft }) {
    const { columns, lastFrozenColumnIndex, totalColumnWidth } = useMemo(() => {
        return getColumnMetrics({
            columns: rawColumns,
            minColumnWidth,
            viewportWidth,
            columnWidths,
            defaultFormatter
        });
    }, [columnWidths, rawColumns, defaultFormatter, minColumnWidth, viewportWidth]);
    const [colOverscanStartIdx, colOverscanEndIdx] = useMemo(() => {
        return getHorizontalRangeToRender(columns, lastFrozenColumnIndex, viewportWidth, scrollLeft);
    }, [scrollLeft, columns, lastFrozenColumnIndex, viewportWidth]);
    const viewportColumns = useMemo(() => {
        return getViewportColumns(columns, colOverscanStartIdx, colOverscanEndIdx);
    }, [colOverscanEndIdx, colOverscanStartIdx, columns]);
    return { columns, viewportColumns, totalColumnWidth, lastFrozenColumnIndex };
}
//# sourceMappingURL=useViewportColumns.js.map