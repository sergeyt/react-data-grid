import { CalculatedColumn } from './types';
import { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, K extends keyof R, SR> = Pick<DataGridProps<R, K, SR>, 'rows' | 'onSelectedRowsChange' | 'sortColumn' | 'sortDirection' | 'onSort' | 'rowKey'>;
export interface HeaderRowProps<R, K extends keyof R, SR> extends SharedDataGridProps<R, K, SR> {
    columns: readonly CalculatedColumn<R, SR>[];
    allRowsSelected: boolean;
    onColumnResize: (column: CalculatedColumn<R, SR>, width: number, done: boolean) => void;
}
declare const _default: <R, K extends keyof R, SR>(props: HeaderRowProps<R, K, SR>) => JSX.Element;
export default _default;
