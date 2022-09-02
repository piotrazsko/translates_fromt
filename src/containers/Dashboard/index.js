import React from 'react';
import {
    PageSkeleton,
    Pane,
    LanguageSelect,
    GridGenerator,
    Cell,
} from 'components';
import { useTranslation } from 'react-i18next';
import Statistics from './components/Statistics';
import Applications from './components/Applications';
import MyBalance from './components/MyBalance';
import MyPlan from './components/MyPlan';
import Transactions from './components/Transactions';

const Dashboard = ({ history, ...props }) => {
    const { t } = useTranslation();
    return (
        <PageSkeleton title={t('dashboard.title')}>
            <GridGenerator
                cols={12}
                rows={2}
                cellProps={
                    {
                        // children: ({ col, row }) => <div></div>,
                    }
                }
                gap={[48, 24]}
            >
                <Cell
                    col={0}
                    row={0}
                    colSpan={4}
                    rowSpan={1}
                    component={<MyBalance />}
                ></Cell>
                <Cell
                    col={4}
                    row={0}
                    colSpan={8}
                    rowSpan={1}
                    component={<Applications history={history} />}
                ></Cell>
                <Cell
                    col={0}
                    row={1}
                    colSpan={6}
                    rowSpan={1}
                    component={<Statistics />}
                ></Cell>
                <Cell
                    col={6}
                    row={1}
                    colSpan={6}
                    rowSpan={1}
                    component={<MyPlan />}
                ></Cell>
                {/* <Cell
                    col={0}
                    row={2}
                    colSpan={12}
                    rowSpan={2}
                    component={<Transactions />}
                ></Cell> */}
            </GridGenerator>
        </PageSkeleton>
    );
};

export default Dashboard;
