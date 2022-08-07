import React from 'react';
import { Pane, GridGenerator, Cell } from 'components';
import { Typography } from '@material-ui/core';

import style from './style.scss';

const Statistic = ({ data = {}, t, style }) => {
    return (
        <Pane style={style} title={t('application.statistic_block')}>
            <GridGenerator
                cols={4}
                rows={4}
                // showGrid
                cellProps={{
                    children: ({ col, row }) => <></>,
                }}
                gap={[12, 12]}
            >
                <>
                    <Cell
                        col={0}
                        row={0}
                        colSpan={3}
                        rowSpan={1}
                        component={<div>statistics</div>}
                    />
                    <Cell
                        col={3}
                        row={0}
                        colSpan={0}
                        rowSpan={1}
                        component={<div>10</div>}
                    />
                </>
            </GridGenerator>
        </Pane>
    );
};

export default Statistic;
