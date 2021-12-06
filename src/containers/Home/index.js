import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Pane, ServiceCard, SkillItem, ClientCard } from 'components';
import { useDispatch } from 'react-redux';
import { showError, showWarning } from 'modules/notification';

import { clients } from 'config/clients.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HeadSection from './HeadSection';
import FeatureSection from './FeatureSection';
import PricingSection from './PricingSection';

const Home = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <HeadSection />
            <FeatureSection />
            <PricingSection />
        </>
    );
};

Home.propTypes = {
    // : PropTypes.
};

export default Home;
