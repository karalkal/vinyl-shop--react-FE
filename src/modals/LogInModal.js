import { useContext, useState } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import { logIn, logInWithGoogle } from '../api/api';

import AuthContext from '../context/AuthContextProvider';
import ErrorContext from '../context/ErrorContextProvider';

import Modal from '../layouts/Modal';
import { Button } from '../components/Button';
import classes from './LogInRegisterModal.module.css';
import ErrorGeneric from '../pages/ErrorGeneric';


export const LogInModal = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext)


  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return { ...prevFormData, [name]: value }   // key is computed prop
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = formData;  // reset form state before sending the request
    setFormData({ email: '', password: '' });
    try {
      // send request
      const response = await logIn(userInput);
      // trigger auth context handler
      authCtx.loginHandler(response.data);
    } catch (error) {
      errCtx.setHasError(error.message);
    }
  };

  // Implicit flow -> returns just access token
  /*
    const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
        );
  
        console.log(userInfo);
        sendGoogleUserInfoLogInOrRegister(userInfo);
        console.log(tokenResponse.access_token, userInfo.config.headers.Authorization)
      },
      onError: errorResponse => console.log(errorResponse),
    });
  */

  // Authorization code flow
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await logInWithGoogle({ code });
      // trigger auth context handler with userData created at BE from google code
      authCtx.loginHandler(response.data);
    },
    flow: 'auth-code',
  });


  // Modal is mounted in RootLayout and will mount conditionally
  if (authCtx.loginModalVisible) {
    return (
      <Modal>
        <form onSubmit={handleSubmit} className={classes.logInForm}>
          <p className={classes.formInputsHeading}>Vinylarium Login</p>
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
          <Button>Submit</Button>
        </form>

        <div className={classes.logInForm}>
          <p className={classes.formInputsHeading} style={{ marginTop: "2em" }}>OR</p>
          <Button onClick={googleLogin}>Login with Google</Button>
        </div>
      </Modal>
    )
  }
}
