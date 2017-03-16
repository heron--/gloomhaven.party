import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import './main.scss';

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { document.body.style.display = 'block'; }, 0);
    
    const rootNode = document.querySelector('#root');
    render(
        <Router>
            { routes }
        </Router>
        , rootNode);
});
