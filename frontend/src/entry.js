import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import './main.scss';

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { document.body.style.display = 'block'; }, 0);
    
    const rootNode = document.querySelector('#root');
    render(<App />, rootNode);
});
