import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Root from './components/Root';
import TRoot from './components/TRoot';
import { ConnectedRouter } from 'connected-react-router';
import './utils/Extends';
import "./styles/main.scss";

const target = document.getElementById('root');
const role = 5;


function render(Component) {
    ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    target,
  );
};

// render(Root);

switch(role){
  case 5:
    render(Root);
    break;
  case 6:
    render(TRoot);
    break;
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA