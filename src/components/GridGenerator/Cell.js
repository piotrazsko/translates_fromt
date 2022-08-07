import React from 'react';
import PropTypes from 'prop-types';

export const Cell = ({
    row,
    col,
    colSpan = 1,
    rowSpan = 1,
    children,
    component,
}) => {
    const gridArea = `${row + 1} / ${col + 1} / ${rowSpan + row + 1} / ${
        colSpan + col + 1
    }`;
    return component ? (
        React.cloneElement(component, { style: { gridArea } })
    ) : (
        <div style={{ gridArea: gridArea }}>{children}</div>
    );
};

Cell.propTypes = {
    // : PropTypes.
};
