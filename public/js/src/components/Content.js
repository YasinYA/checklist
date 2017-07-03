import React from 'react';
import {Switch, Route} from 'react-router-dom';

import { Home } from './pages/home_page/Home';
import { Checklist } from './pages/checklist_page/Checklist';
import { Profile } from './pages/profile_page/Profile';
import { Login } from './pages/login_page/Login';
import { Register } from './pages/register_page/Register';

export class Content extends React.Component {
    render() {
        return (
            <Switch>
                <div>
                    <Route exact={true} path='/' component={Home} />
                    <Route path='/checklist' component={Checklist} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </div>
            </Switch>
        );
    }
}
