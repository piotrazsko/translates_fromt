import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import HeadSection from './HeadSection';
import { FirstSection } from './components/FirstSection';
import { SecondSection } from './components/SecondSection';

const Home = ({ history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <FirstSection t={t} />
            <SecondSection t={t} />
            <HeadSection history={history} />
            {/* <FeatureSection history={history} />
            <PricingSection history={history} /> */}
        </>
    );
};

Home.propTypes = {
    // : PropTypes.
};

export default Home;
