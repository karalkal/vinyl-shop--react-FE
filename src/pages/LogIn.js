import { useContext, useState } from 'react'
import { logIn } from '../api/api';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
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
      <button>Submit</button>
    </form>
  )
}
