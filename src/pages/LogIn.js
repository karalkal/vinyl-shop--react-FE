import { useContext, useState } from 'react'
import { logIn } from '../api/api';
import AuthContext from '../context/auth-context';
import Modal from '../UI/Modal';
import { Button } from '../components/Button';
import classes from './LogInRegisterModal.module.css';


export const LogIn = () => {
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

  // Modal is mounted in RootLayout and will mount conditionally
  if (ctx.loginModalVisible) {
    return (
      <Modal>
        <form onSubmit={handleSubmit} className={classes.logInForm}>
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
      </Modal>
    )
  }
}
