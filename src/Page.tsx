import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import NotFound from './pages/login/NotFound';
// import Login from './pages/login';
// import App from './App';
// import ABtestDetile from '@/pages/ABtest/Detile';
import routers from '@/routes/MainConfig.tsx';
export default () => (
    <Router>
        <Switch>
            {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
        </Switch>
    </Router>
);
