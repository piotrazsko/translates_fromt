import React from 'react';
import IconButtonDef from '@mui/material/IconButton';

const IconButton = ({ children, size, iconSize, ...props }) => {
    const iconSizeDft =
        iconSize || size === 'small' ? 11 : size === 'large' ? 14 : 13;
    return (
        <IconButtonDef size={size} {...props}>
            {React.cloneElement(children, {
                height: iconSizeDft,
                fontSize: `${iconSize}px`,
            })}
        </IconButtonDef>
    );
};

export default IconButton;
