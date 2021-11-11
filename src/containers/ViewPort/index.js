import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';

import { getViewport as getViewPortSize } from 'app/utils/dom';
import { changeViewport, getViewport } from 'modules/viewport';

class ViewportContainer extends Component {
    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
        const { viewport, changeViewport } = this.props;
        const newViewport = getViewPortSize();
        if (!isEqual(viewport.name, newViewport.name)) {
            changeViewport(newViewport);
        }
    };

    render() {
        return null;
    }
}

ViewportContainer.propTypes = {
    viewport: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    changeViewport: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        viewport: getViewport(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeViewport: bindActionCreators(changeViewport, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewportContainer);
