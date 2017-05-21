import React from 'react';
import ReactDom from 'react-dom';

import { App } from './components/App';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <App></App>
            </div>
        );
    }
}

const app = document.getElementById('app');

ReactDom.render(
    <AppComponent/>,
    app
);
