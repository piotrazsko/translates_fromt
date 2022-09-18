import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

const Background = ({ onClick, children, childrenClassName = '', className = '' }) => {
    React.useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);
    const handleClick = event => {
        onClick(event);
    };
    return (
        <div
            className={[style.popup_background, className].join(' ')}
            role="presentation"
            onClick={ev => {
                handleClick(ev);
                ev.stopPropagation();
            }}
        >
            <div
                className={[style.popup_background_inbox, childrenClassName].join(' ')}
                onClick={ev => ev.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

Background.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    childrenClassName: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array])
        .isRequired,
};

export default Background;
