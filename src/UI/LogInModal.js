import { useContext, useState } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import { logIn, logInWithGoogle } from '../api/api';

import AuthContext from '../context/AuthContextProvider';
import Modal from './Modal';
import { Button } from '../components/Button';
import classes from './LogInRegisterModal.module.css';


export const LogInModal = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const ctx = useContext(AuthContext);


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
    // send request
    const response = await logIn(userInput);
    // trigger auth context handler
    ctx.loginHandler(response.data);
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
      console.log(code);

      const tokens = await logInWithGoogle({ code });
      console.log(tokens);
    },
    flow: 'auth-code',
  });


  // Modal is mounted in RootLayout and will mount conditionally
  if (ctx.loginModalVisible) {
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
