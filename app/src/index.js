/* eslint-disable */
import SC from 'soundcloud';
/* eslint-enable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './stores/configureStore';
import App from './components/App';

require('../styles/index.scss');

const store = configureStore();

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('app'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const NextApp = require('./components/App').default;
    render(NextApp);
  });
}

