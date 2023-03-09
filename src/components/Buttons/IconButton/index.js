import React from 'react';
import IconButtonDef from '@mui/material/IconButton';

const IconButton = ({ children, size, iconSize, ...props }) => {
    let definedSize;  
    switch (size) {
    case 'small':
        definedSize = 11;
        break;
    case 'large':
        definedSize = 14;
        break;
    case 'extraLarge':
        definedSize = 23;
        break;
    default:
        definedSize = 13;
    }
    const iconSizeDft = iconSize || definedSize;

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
