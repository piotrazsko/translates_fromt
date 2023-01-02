import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

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

const Home = ({ history, viewPort: { isMobile }, ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <Header history={history} t={t} isMobile={isMobile} />
            <FirstSection history={history} t={t} isMobile={isMobile} />
            <SecondSection history={history} t={t} isMobile={isMobile} />
            <ThirdSection history={history} isMobile={isMobile} t={t} />
            <ForthSection history={history} isMobile={isMobile} t={t} />
            <FivethSection history={history} isMobile={isMobile} t={t} />
            <SixthSection history={history} isMobile={isMobile} t={t} />
            <SeventhSection history={history} isMobile={isMobile} t={t} />
            <EightSection history={history} isMobile={isMobile} t={t} />
            <Footer history={history} isMobile={isMobile} t={t} />
        </>
    );
};

Home.propTypes = {
    // : PropTypes.
};

export default Home;
