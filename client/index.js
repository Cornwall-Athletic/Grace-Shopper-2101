// Where Render React Main Component
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './store';
import Main from './components/Main';
import CssBaseline from '@material-ui/core/CssBaseline';

render(
  <Provider store={reduxStore.store}>
    {/* The below is Material UI's baseline styling: comment this out to return to Alejandra's styling  */}
    {/* <CssBaseline /> */}
    <PersistGate loading={null} persistor={reduxStore.persistor}>
      <Main />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
