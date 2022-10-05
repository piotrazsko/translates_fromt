import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PageSkeleton, GridGenerator, Cell } from 'components';

import {
    getCommonStatissticsRequset,
    getCommonStatisticsSelector,
    getApplicationsStatisticsRequest,
    getApplicationsStatisticsSelector,
} from 'modules/statistics';
import { getCurrentUserSelector } from 'modules/auth';
import { getPlanByIdRequest, getPlanByIdSelector } from 'modules/plans';

import Applications from './components/Applications';
import MyBalance from './components/MyBalance';
import { Chart } from './components/Chart';

const Dashboard = ({ history, setTitle, viewPort, ...props }) => {
    const { t } = useTranslation();
    setTitle(t('dashboard.title'));
    const dispatch = useDispatch();
    const applications = useSelector(getApplicationsStatisticsSelector);
    const { loaded, ...commonStatistic } = useSelector(
        getCommonStatisticsSelector,
    );
    const user = useSelector(getCurrentUserSelector);
    const { maxApplications = 0, maxTranslates = 0 } =
        useSelector(getPlanByIdSelector);

    React.useEffect(() => {
        dispatch(getApplicationsStatisticsRequest());
        dispatch(getCommonStatissticsRequset());
    }, []);

    React.useEffect(() => {
        if (user?.plan) {
            dispatch(getPlanByIdRequest({ planId: user.plan }));
        }
    }, [user]);
    console.log(commonStatistic);
    return (
        <PageSkeleton>
            <GridGenerator
                cols={5}
                rows={5}
                cellProps={
                    {
                        // children: ({ col, row }) => <div></div>,
                    }
                }
                gap={[30, 30]}
            >
                <Cell
                    col={0}
                    row={0}
                    colSpan={1}
                    rowSpan={2}
                    component={
                        <Chart
                            viewPort={viewPort}
                            title={'Existing Languages'}
                        />
                    }
                ></Cell>
                <Cell
                    col={1}
                    row={0}
                    colSpan={1}
                    rowSpan={2}
                    component={
                        <Chart
                            viewPort={viewPort}
                            title={'Existing Translates'}
                            color="#3D7FFF"
                            maxCount={maxTranslates}
                        />
                    }
                ></Cell>
                <Cell
                    col={2}
                    row={0}
                    colSpan={1}
                    rowSpan={2}
                    component={
                        <Chart
                            viewPort={viewPort}
                            title={'Existing Applications'}
                            color="#9747FF"
                            maxCount={maxApplications}
                        />
                    }
                ></Cell>
                <Cell
                    col={3}
                    row={0}
                    colSpan={2}
                    rowSpan={2}
                    component={<MyBalance />}
                ></Cell>
                <Cell
                    col={0}
                    row={2}
                    colSpan={5}
                    rowSpan={3}
                    component={
                        <Applications
                            history={history}
                            applications={applications}
                        />
                    }
                ></Cell>
                {/* <Cell
                    col={0}
                    row={3}
                    colSpan={6}
                    rowSpan={3}
                    component={<Statistics data={commonStatistic} />}
                ></Cell> */}
                {/* <Cell
                    col={6}
                    row={3}
                    colSpan={6}
                    rowSpan={3}
                    component={<MyPlan data={currentPlan} history={history} />}
                ></Cell> */}
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
