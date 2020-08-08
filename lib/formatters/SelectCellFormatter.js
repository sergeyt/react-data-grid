import React, { useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
export function SelectCellFormatter({ value, tabIndex, isCellSelected, disabled, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }) {
    const inputRef = useRef(null);
    useLayoutEffect(() => {
        var _a;
        if (!isCellSelected)
            return;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [isCellSelected]);
    function handleChange(e) {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
    }
    return (React.createElement("label", { className: clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled }) },
        React.createElement("input", { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, tabIndex: tabIndex, ref: inputRef, type: "checkbox", className: "rdg-checkbox-input", disabled: disabled, onChange: handleChange, checked: value }),
        React.createElement("div", { className: "rdg-checkbox" })));
}
//# sourceMappingURL=SelectCellFormatter.js.map