import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.scss';

const UpdatePlanLInk = ({ t }) => {
    return (
        <Link className={style.updatePlanLink} to="/update-plan">
            {t('default.update_plan')}
        </Link>
    );
};

export default UpdatePlanLInk;
