import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Pane, ServiceCard, SkillItem, ClientCard } from 'components';
import { useDispatch } from 'react-redux';
import { showError, showWarning } from 'modules/notification';

import { clients } from 'config/clients.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeadSection from './HeadSection';
import FeatureSection from './FeatureSection';
import PricingSection from './PricingSection';

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
