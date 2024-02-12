import { useContext, useState } from 'react'
import { register } from '../api/api';
import AuthContext from '../context/auth-context';
import Modal from '../UI/Modal';
import { Button } from '../components/Button';
import classes from './LogInRegisterModal.module.css';

// f_name, l_name, email, password, house_number, street_name, city, country - FIRST FOUR REQUIRED
// DB constraints - pass between 4 and 35, names between 3 and 44
// Sending password unencrypted is OK: The client would just sent the clear text password over a secure connection (HTTPS) to the server.
export const Register = () => {
  const [formData, setFormData] = useState({ f_name: '', l_name: '', email: '', password: '', house_number: '', street_name: '', city: '', country: '' });
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
    setFormData({ f_name: '', l_name: '', email: '', password: '', house_number: '', street_name: '', city: '', country: '' });
    // send request
    const response = await register(userInput);
    // trigger auth context handler
    ctx.loginHandler(response.data);
  };

  // Modal is mounted in RootLayout and will mount conditionally
  if (ctx.registerModalVisible) {
    return (
      <Modal>
        <form onSubmit={handleSubmit} className={classes.logInForm}>
          f_name, l_name, email, password, house_number, street_name, city, country
          <input
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            name="f_name"
            value={formData.f_name}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            name="l_name"
            value={formData.l_name}
          />
          <input
            required
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          <input
            required
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
          <input
            required
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            name="rePass"
            value={formData.rePass}
          />


          <Button>Submit</Button>
        </form>
      </Modal>
    )
  }
}
