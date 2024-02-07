import React, { useState } from 'react';
import { useSignIn } from "react-auth-kit";

import Modal from '../UI/Modal';
import { logIn } from '../api/api';

const SignInComponent = () => {
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await logIn(formData)
      console.log(response.data)
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: formData.email },
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type={"email"} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type={"password"} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

      <button>Submit</button>
    </form>
  )
}

export { SignInComponent }