import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    PageSkeleton,
    Pane,
    LanguageSelect,
    GridGenerator,
    Cell,
} from 'components';

import {
    getCommonStatissticsRequset,
    getCommonStatisticsSelector,
    getApplicationsStatisticsRequest,
    getApplicationsStatisticsSelector,
} from 'modules/statistics';

import Statistics from './components/Statistics';
import Applications from './components/Applications';
import MyBalance from './components/MyBalance';
import MyPlan from './components/MyPlan';
import Transactions from './components/Transactions';

const Dashboard = ({ history, ...props }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const applications = useSelector(getApplicationsStatisticsSelector);
    const { loaded, ...commonStatistic } = useSelector(
        getCommonStatisticsSelector,
    );
    console.log(commonStatistic);
    React.useEffect(() => {
        dispatch(getApplicationsStatisticsRequest());
        dispatch(getCommonStatissticsRequset());
    }, []);
    return (
        <PageSkeleton title={t('dashboard.title')}>
            <GridGenerator
                cols={12}
                rows={7}
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
                    rowSpan={3}
                    component={<MyBalance />}
                ></Cell>
                <Cell
                    col={4}
                    row={0}
                    colSpan={8}
                    rowSpan={3}
                    component={
                        <Applications
                            history={history}
                            applications={applications}
                        />
                    }
                ></Cell>
                <Cell
                    col={0}
                    row={3}
                    colSpan={6}
                    rowSpan={3}
                    component={<Statistics data={commonStatistic} />}
                ></Cell>
                <Cell
                    col={6}
                    row={3}
                    colSpan={6}
                    rowSpan={3}
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
