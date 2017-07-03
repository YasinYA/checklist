import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import { Navbar } from './Navbar';
import { Content } from './Content';
import { Footer } from './Footer';

export class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Content/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}
