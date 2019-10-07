import React, { Component } from 'react';
import GoogleSignIn from '../../components/GoogleSignIn'


class Login extends Component {

  render () {
    const { onSuccess, errorMsg } = this.props;

    return(
      <div className="login">
        <h3>Sign in using your points email</h3>
        <GoogleSignIn onSuccess= { onSuccess } />
        {
          errorMsg ?
          <div className="error-msg">
            You must use a Points email to view this. Please sign out and try again.
          </div>
          : null
        }
      </div>
    )
  }
}

export default Login;