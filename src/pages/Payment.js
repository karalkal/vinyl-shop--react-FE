import { useContext, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Button } from '../components/Button';
import classes from './Payment.module.css';
import { placeOrder } from '../api/api';


export const Payment = () => {
  const [formData, setFormData] = useState({ credit_card_no: '' });
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  // TODO if not logged in display error or redirect to login/register

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      // only digits
      if (!isNaN(Number(value))) {
        return { ...prevFormData, [name]: value }   // key is computed prop
      }
      else {
        return prevFormData
      }
    })
  }

  // mock payment verification
  function validCreditCardData() {
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({ credit_card_no: '' });

    const requestBody = {}

    if (!validCreditCardData()) {
      throw new Error("Payment data invalid");
    }
    else {
      requestBody.paymentSuccessful = true
    }

    const albumsOrdered = cartCtx.items.map(item => {
      return {
        id: item.id, amountRequested: item.amountRequested,
        name: item.name, price: item.price
      }
    })

    requestBody.albumsOrdered = albumsOrdered;
    requestBody.totalFromFE = cartCtx.totalAmount;
    requestBody.loggedInUserData = authCtx.loggedInUserData
    console.log(requestBody);
    const response = await placeOrder(requestBody);
    console.log(response.data)
  };



  return (
    <form onSubmit={handleSubmit} className={classes.paymentForm}>
      <p className={classes.formInputsHeading}>Required Data</p>
      <input
        type="text"
        required
        placeholder="Credit Card Number"
        onChange={handleChange}
        name="credit_card_no"
        value={formData.credit_card_no}
      />
      <Button>Submit</Button>
    </form>
  )

}
