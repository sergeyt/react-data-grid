import React from 'react';
import clsx from 'clsx';
export function SelectCellFormatter({ value, disabled = false, onChange }) {
    function handleChange(e) {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
    }
    return (React.createElement("label", { className: clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled }) },
        React.createElement("input", { type: "checkbox", className: "rdg-checkbox-input", disabled: disabled, onChange: handleChange, checked: value }),
        React.createElement("div", { className: "rdg-checkbox" })));
}
//# sourceMappingURL=SelectCellFormatter.js.map