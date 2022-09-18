/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { PageSkeleton, GridGenerator, Cell } from 'components';
import Card from './components/Card';
import { useHook } from './hooks';

import style from './style.scss';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '20px',
    },
}));

const Plans = ({ route, location, history, ...props }) => {
    const classes = useStyles();

    const { t, plans, currentPlan, onUpdate } = useHook({});

    return (
        <PageSkeleton title={t('plans.title_page')} showButton>
            <GridGenerator
                cols={12}
                rows={4}
                // showGrid
                cellProps={
                    {
                        // children: ({ col, row }) => <div></div>,
                    }
                }
                gap={[48, 24]}
            >
                <Cell
                    col={1}
                    row={0}
                    colSpan={3}
                    rowSpan={3}
                    component={
                        <Card
                            data={plans[0]}
                            onUpdate={onUpdate}
                            usersPlan={currentPlan}
                        />
                    }
                ></Cell>
                <Cell
                    col={4}
                    row={0}
                    colSpan={3}
                    rowSpan={4}
                    component={
                        <Card
                            data={plans[1]}
                            onUpdate={onUpdate}
                            usersPlan={currentPlan}
                        />
                    }
                ></Cell>
                <Cell
                    col={7}
                    row={0}
                    colSpan={3}
                    rowSpan={3}
                    component={
                        <Card
                            data={plans[2]}
                            onUpdate={onUpdate}
                            usersPlan={currentPlan}
                        />
                    }
                ></Cell>
            </GridGenerator>
        </PageSkeleton>
    );
};

Plans.propTypes = {};

export default Plans;
