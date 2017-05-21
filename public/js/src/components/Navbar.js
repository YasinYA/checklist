import React from 'react';
import {Link} from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        return (
            <header>
                <nav class='navbar navbar-default'>
                    <div class='container-fluid'>
                        <div class='navbar-header'>
                            <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                                <span class='sr-only'>Toggle navigation</span>
                                <span class='icon-bar'></span>
                                <span class='icon-bar'></span>
                                <span class='icon-bar'></span>
                            </button>
                            <Link class='navbar-brand' to='/'>Checklist</Link>
                        </div>
                        <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                            <ul class='nav navbar-nav'>
                                <li class='active'><Link to='/'><span class='sr-only'>(current)</span>Home</Link></li>
                                <li><Link to='/checklist'>Your Checklist</Link></li>
                                <li><Link to='/profile'>Profile</Link></li>
                            </ul>
                            <form class='navbar-form navbar-left'>
                                <div class='form-group'>
                                    <input type='text' class='form-control' placeholder='Search Checklist'/>
                                </div>
                                <button type='submit' class='btn btn-default'>Submit</button>
                            </form>
                            <ul class='nav navbar-nav navbar-right'>
                                <li><Link to='/login'>Log In</Link></li>
                                <li><Link to='/register'>Sign Up</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}
