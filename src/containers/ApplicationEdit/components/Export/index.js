import React from 'react';
import { Pane, GridGenerator, Cell } from 'components';
import { Typography } from '@material-ui/core';

import style from './style.scss';

const Export = ({ data = {}, t, style }) => {
    return <Pane style={style} title={t('application.export_block')}></Pane>;
};

export default Export;
