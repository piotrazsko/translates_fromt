import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import HeadSection from './HeadSection';
import { Header } from './components/Header';
import { FirstSection } from './components/FirstSection';
import { SecondSection } from './components/SecondSection';

const Home = ({ history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <Header t={t} />
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
