import { CalculatedColumn, Omit, SharedEditorContainerProps } from '../types';
export interface EditorContainerProps<R, SR> extends Omit<SharedEditorContainerProps, 'editorPortalTarget'> {
    rowIdx: number;
    row: R;
    column: CalculatedColumn<R, SR>;
    top: number;
    left: number;
    getCellValue?: (row: R, col: CalculatedColumn<R, SR>) => unknown;
}
export default function EditorContainer<R, SR>({ rowIdx, column, row, rowHeight, left, top, onCommit, onCommitCancel, scrollLeft, scrollTop, firstEditorKeyPress: key, getCellValue }: EditorContainerProps<R, SR>): JSX.Element;
