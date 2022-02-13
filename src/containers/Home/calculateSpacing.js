/* eslint-disable react-hooks/rules-of-hooks */
import { useIsWidthUp } from 'helpers/mui';
// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => (
    <WrappedComponent {...props} width="xs" />
);

function calculateSpacing(width) {
    if (useIsWidthUp('lg', width)) {
        return 5;
    }
    if (useIsWidthUp('md', width)) {
        return 4;
    }
    if (useIsWidthUp('sm', width)) {
        return 3;
    }
    return 2;
}

export default calculateSpacing;
