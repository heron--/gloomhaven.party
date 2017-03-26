import createHistory from 'history/createBrowserHistory';

const history = createHistory();

history.listen((location, action) => {
    console.log('Routing to: '); 
    console.log(action, location.pathname, location.state);
});

export { history as default };
