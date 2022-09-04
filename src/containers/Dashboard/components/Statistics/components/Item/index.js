import React from 'react';
import style from './style.scss';

const Item = ({ title, value }) => {
    return (
        <div className={style.container}>
            <div className={style.title}>{title}</div>
            <div className={style.value}>{value}</div>
        </div>
    );
};

export default Item;
