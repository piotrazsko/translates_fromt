import React from 'react';
import Button from '@mui/material/Button';

import { Pane } from 'components';

import style from './style.scss';

const Card = ({ data = {}, t, usersPlan, onUpdate, style }) => {
    const { name, description, id } = data;
    const isActive = id === usersPlan;
    return (
        <Pane
            title={name}
            classes={{ content: style.card, container: style.container }}
            style={style}
        >
            {description}
            <Button
                disabled={isActive}
                variant="contained"
                fullWidth
                size="small"
                onClick={() => {
                    onUpdate(id);
                }}
            >
                {'Use'}
            </Button>
        </Pane>
    );
};

export default Card;
