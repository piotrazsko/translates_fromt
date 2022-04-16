import React from 'react';
import PropTypes from 'prop-types';
import Background from './Background';

const PopupBackground = ({ onClick, visible = false, className, children, childrenClassName }) => {
    return visible ? (
        <Background onClick={onClick} className={className} childrenClassName={childrenClassName}>
            {children}
        </Background>
    ) : null;
};

PopupBackground.propTypes = {
    visible: PropTypes.bool,
    className: PropTypes.string,
    childrenClassName: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array])
        .isRequired,
};

export default PopupBackground;
