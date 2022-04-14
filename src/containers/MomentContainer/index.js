import { PureComponent } from 'react';
import moment from 'moment';
import enLocale from 'moment/locale/en-gb';

class MomentContainer extends PureComponent {
    componentDidMount() {
        moment.locale('en', enLocale);
    }

    render() {
        return null;
    }
}

export default MomentContainer;
