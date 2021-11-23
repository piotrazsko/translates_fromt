import React, { Fragment } from 'react';
import routes, { redirectAuthPath } from 'routes';
import { useSelector } from 'react-redux';
import { Routing, Popups } from 'containers';
import 'modules/i18next';

import { isRehydrated } from 'modules/init';
import '../../style/style.common.scss';
import '../../assets/fonts/stylesheet.css';

const App = ({ ...props }) => {
    const rehidrated = useSelector(isRehydrated);
    return rehidrated ? (
        <Fragment>
            <Routing routes={routes} redirectUrl={redirectAuthPath} />
            <Popups />
        </Fragment>
    ) : null;
};

export default App;
