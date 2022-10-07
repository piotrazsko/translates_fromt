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
import MyPlan from './components/MyPlan';
import { Chart } from './components/Chart';

const Dashboard = ({ history, setTitle, viewPort, ...props }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const applications = useSelector(getApplicationsStatisticsSelector);
    const { loaded, languagesCount, countTranslates, applicationsCount } =
        useSelector(getCommonStatisticsSelector);
    const user = useSelector(getCurrentUserSelector);
    const currentPlan = useSelector(getPlanByIdSelector);

    const { maxApplications, maxTranslates, maxLanguages } = currentPlan;

    setTitle(t('dashboard.title'));

    React.useEffect(() => {
        dispatch(getApplicationsStatisticsRequest());
        dispatch(getCommonStatissticsRequset());
    }, []);

    React.useEffect(() => {
        if (user?.plan) {
            dispatch(getPlanByIdRequest({ planId: user.plan }));
        }
    }, [user]);
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
                            title={t('dashboard.existing_languages')}
                            maxCount={maxLanguages}
                            count={languagesCount}
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
                            title={t('dashboard.existing_translates')}
                            color="#3D7FFF"
                            maxCount={maxTranslates}
                            count={countTranslates}
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
                            title={t('dashboard.existing_applications')}
                            color="#9747FF"
                            maxCount={maxApplications}
                            count={applicationsCount}
                        />
                    }
                ></Cell>
                <Cell
                    col={3}
                    row={0}
                    colSpan={2}
                    rowSpan={2}
                    component={<MyPlan data={currentPlan} />}
                ></Cell>
                <Cell
                    col={0}
                    row={2}
                    colSpan={5}
                    rowSpan={3}
                    component={<div></div>}
                >
                    <Applications
                        history={history}
                        applications={applications}
                    />
                </Cell>
            </GridGenerator>
        </PageSkeleton>
    );
};

export default Dashboard;
