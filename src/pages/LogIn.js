import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { logIn } from '../api/api';
import AuthContext from '../context/auth-context';
import Modal from '../UI/Modal';
import { Button } from '../components/Button';
import classes from './LogIn.module.css';


export const LogIn = () => {
  const ctx = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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
    const response = await logIn(userInput);

    ctx.onLogin(response.data);
    // after setting state and localStorage navigate to previous page
    navigate(-1);
  };


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
