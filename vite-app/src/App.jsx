import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Button from '@atlaskit/button';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => {
  const routing = useRoutes(routes());
  return routing;
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
