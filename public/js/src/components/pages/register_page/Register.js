import React from 'react';
import axios from 'axios';

export class Register extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleEvent = this.handleEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEvent(event) {
        const target = event.target.name;
        const targetValue = event.target.value;

        this.setState({
            [target]: targetValue    
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post('/api/signup', this.state)
            .then( response => {
                console.log(response);
                let data = response.data;

                if(data.success) {
                    window.location.href = '/profile';
                }
            })
            .catch( err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className='col-md-8 col-md-offset-2'>
                        <h1 className="text-center">Sign Up</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8 col-md-offset-2'>
                        <form action='' onSubmit={this.handleSubmit}>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group row'>
                                        <div className='col-md-2'>
                                            <label htmlFor='username'>Username</label>
                                        </div>
                                        <div className='col-md-4'>
                                            <input type='text' name='username' value={this.state.username} onChange={this.handleEvent} className='form-control' />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <div className='col-md-2'>
                                            <label htmlFor='password'>Password</label>
                                        </div>
                                        <div className='col-md-4'>
                                            <input type='password' name='password' value={this.state.password} onChange={this.handleEvent} className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6 text-center'>
                                    <button className='btn btn-primary'>Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
