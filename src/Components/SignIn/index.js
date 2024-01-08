import React, { Component } from 'react';
import './styles.scss';
import Button from '../Forms/Button';
import { signInWithGoogle } from '../../firebase/Utils';

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    // Your form submission logic can be added here.
  }

  handleSignInWithGoogle = async () => {
    try {
      // Attempt to sign in with Google using a popup
      await signInWithGoogle();
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        // Handle the user closing the popup
        console.log('Authentication popup was closed by the user');
      } else {
        // Handle other authentication errors
        console.error('An error occurred during authentication:', error.message);
      }
    }
  }

  render() {
    return (
      <div className="SignIn">
        <div className="wrap">
          <h2>Log In</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignIn">
                <div className="row">
                  <Button onClick={this.handleSignInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
