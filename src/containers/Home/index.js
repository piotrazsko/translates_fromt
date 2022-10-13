import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import HeadSection from './HeadSection';

const Home = ({ history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
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
