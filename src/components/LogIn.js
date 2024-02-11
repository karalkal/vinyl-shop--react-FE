import React from 'react'
import { logIn } from '../api/api';

export const LogIn = () => {

  const [formData, setFormData] = React.useState({ email: '', password: '' });


  function handleChange(event) {
    const { name, value } = event.target

    setFormData(prevFormData => {
      return { ...prevFormData, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await logIn(formData);
      console.log(response.data);
      localStorage.clear();
      localStorage.setItem("auth_token", response.data.token)
      localStorage.setItem("email", response.data.email)
      localStorage.setItem("first_name", response.data.first_name)
      localStorage.setItem("last_name", response.data.last_name)
      setFormData({ email: '', password: '' })

    } catch (err) {
      console.log("Error: ", err.message);
      throw new Error()
    }
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
