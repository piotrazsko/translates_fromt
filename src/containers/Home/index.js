import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import HeadSection from './HeadSection';
import { Header } from './components/Header';
import { FirstSection } from './components/FirstSection';
import { SecondSection } from './components/SecondSection';
import { ThirdSection } from './components/ThirdSection';
import { ForthSection } from './components/ForthSection';
import { FivethSection } from './components/FivethSection';
import { SixthSection } from './components/SixthSection';
import { SeventhSection } from './components/SeventhSection';
import { EightSection } from './components/EightSection';
import { Footer } from './components/Footer';

const Home = ({ history, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <Header t={t} />
            <FirstSection t={t} />
            <SecondSection t={t} />
            <ThirdSection history={history} t={t} />
            <ForthSection history={history} t={t} />
            <FivethSection history={history} t={t} />
            <SixthSection history={history} t={t} />
            <SeventhSection history={history} t={t} />
            <EightSection history={history} t={t} />
            <Footer history={history} t={t} />
        </>
    );
};

Home.propTypes = {
    // : PropTypes.
};

export default Home;
