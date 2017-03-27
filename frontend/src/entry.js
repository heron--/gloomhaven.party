import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import './main.scss';

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { document.body.style.display = 'block'; }, 0);

    const rootNode = document.querySelector('#root');

    render(
        <Provider store={ store }>
            <Router>
                <Route path="/" component={ App } />
            </Router>
        </Provider>, rootNode);
});
