import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
// import { theme } from './assets/jss/theme.js';
import AppContainer from 'containers/App';
import MomentContainer from 'containers/MomentContainer';
import { theme } from 'style/theme';
import { store } from 'store';
import Viewport from 'containers/ViewPort';

function App() {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <AppContainer />
                    <Viewport />
                    <MomentContainer />
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}

export default App;
