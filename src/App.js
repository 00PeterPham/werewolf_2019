import React, { Component } from 'react';
import './App.css';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

class App extends Component {
  // state = {
  //   slackUsers: null,
  //   verifiedSignIn: false,
  //   errorMsg: false,
  // }
  // getAllUsers = async () => {
  //   //Get all Points users
  //   const slackUsersEndPoint = `https://slack.com/api/users.list?token=${process.env.REACT_APP_API_KEY}&pretty=1`;
  //   const response = await fetch(slackUsersEndPoint);
  //   const data = await response.json();
  //   const slackUsers = data.members;

  //   this.setState({
  //     slackUsers,
  //   })
  // }

  // onSuccess = async (googleUser) => {
  //   await this.getAllUsers();
  //   const profile = googleUser.getBasicProfile();
  //   const email = profile.U3;
  //   const allUsers = this.state.slackUsers;
  //   const foundUserEmail = allUsers.find((user) => {
  //     return user.profile.email === email;
  //   })

  //   if( foundUserEmail ){
  //     //Change state to route user to a voting page
  //     console.log("SUCCESSFUL!! Found user");
  //     this.setState({
  //       verifiedSignIn: true,
  //       errorMSh: false,
  //     })
  //   }else { 
  //     //Show Error msg: "Email does not exist in werewolf game"
  //     console.log(`Unable to login.`);
  //     this.setState({
  //       slackUsers: null,
  //       verifiedSignIn: false,
  //       errorMsg: true,
  //     })
  //   }

  // }

  render () {
    // const { verifiedSignIn, errorMsg } = this.state;

    return (
      <div className='App'>
        {/* <Login onSuccess= { this.onSuccess } errorMsg= { errorMsg } />
        {
          verifiedSignIn ? */}
          <Dashboard />
          {/* : null
        } */}
      </div>
    );
  }
}

export default App;
