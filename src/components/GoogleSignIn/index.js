import React, { Component } from 'react';
import './googleSignIn.css';
const GOOGLE_BUTTON_ID = 'google-sign-in-button';

class GoogleSignIn extends Component {
  componentDidMount() {
    if(window.gapi){
      window.gapi.signin2.render( //rendering before dom sometimes -- !window.gapi
        GOOGLE_BUTTON_ID,
        {
          width: 200,
          height: 50,
          onsuccess: this.props.onSuccess,
        },
      );
    }
  }

  signOut = () => {
    if(window.gapi){
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  }
  
  render () {
    return(
      <>
        <div className="sign-in-button" id={GOOGLE_BUTTON_ID}/>
        <button className="sign-out-button" onClick={this.signOut}>Sign out</button>
      </>
    )
  }
}

export default GoogleSignIn;