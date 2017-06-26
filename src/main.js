import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App.jsx';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Component />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => { render(App); });
}

