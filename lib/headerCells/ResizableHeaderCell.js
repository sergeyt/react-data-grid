import React, { cloneElement } from 'react';
export default function ResizableHeaderCell({ children, column, onResize }) {
    function onMouseDown(event) {
        if (event.button !== 0) {
            return;
        }
        const { currentTarget } = event;
        const { right } = currentTarget.getBoundingClientRect();
        const offset = right - event.clientX;
        if (offset > 11) { // +1px to account for the border size
            return;
        }
        const onMouseMove = (event) => {
            handleResize(event.clientX + offset, currentTarget, false);
        };
        const onMouseUp = (event) => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            handleResize(event.clientX + offset, currentTarget, true);
        };
        event.preventDefault();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }
    function onTouchStart(event) {
        const touch = event.changedTouches[0];
        const { identifier } = touch;
        const { currentTarget } = event;
        const { right } = currentTarget.getBoundingClientRect();
        const offset = right - touch.clientX;
        if (offset > 11) { // +1px to account for the border size
            return;
        }
        function getTouch(event) {
            for (const touch of event.changedTouches) {
                if (touch.identifier === identifier)
                    return touch;
            }
            return null;
        }
        const onTouchMove = (event) => {
            const touch = getTouch(event);
            if (touch) {
                handleResize(touch.clientX + offset, currentTarget, false);
            }
        };
        const onTouchEnd = (event) => {
            const touch = getTouch(event);
            if (!touch)
                return;
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            if (touch) {
                handleResize(touch.clientX + offset, currentTarget, true);
            }
        };
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);
    }
    function handleResize(x, target, done) {
        const width = x - target.getBoundingClientRect().left;
        if (width > 0) {
            onResize(column, width, done);
        }
    }
    return cloneElement(children, {
        onMouseDown,
        onTouchStart,
        children: (React.createElement(React.Fragment, null,
            children.props.children,
            React.createElement("div", { className: "rdg-header-cell-resizer" })))
    });
}
//# sourceMappingURL=ResizableHeaderCell.js.map