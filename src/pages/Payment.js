import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContextProvider';
import CartContext from '../context/CartContextProvider';

import { Button } from '../components/Button';
import styles from './Payment.module.css';
import { placeOrder } from '../api/api';
import ErrorGeneric from './ErrorGeneric';


export const Payment = () => {
  const [formData, setFormData] = useState({ credit_card_no: '' });
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()

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

    if (cartCtx.items.length < 1) { throw new Error("Cart is empty"); }

    setFormData({ credit_card_no: '' });    //reset form

    const requestBody = {}                  // construct object to send to BE

    if (!validCreditCardData()) { throw new Error("Payment data invalid"); }
    else {
      requestBody.paymentSuccessful = true    // atm BE is not utilizing this prop
    }

    // for each item in cart create object with album data AND AMOUNT REQUESTED
    const albumsOrdered = cartCtx.items.map(item => {
      return {
        id: item.id, name: item.name, price: item.price,
        amountRequested: item.amountRequested,
      }
    })

    requestBody.albumsOrdered = albumsOrdered;
    requestBody.totalFromFE = cartCtx.totalAmount;
    requestBody.userEmail = authCtx.loggedInUserData.email;

    const response = await placeOrder(
      requestBody,
      authCtx.loggedInUserData.auth_token);       // goes here -->> headers: { Authorization: `Bearer ${authToken}`
    console.log(response);

    //empty cart, will also persist in localStorage
    cartCtx.emptyCart();
    navigate('/');
  };


  return (<>
    {authCtx.isLoggedIn
      ? <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <p className={styles.formInputsHeading}>Pay by card</p>
        <input
          type="text"
          required
          placeholder="Payment card number"
          onChange={handleChange}
          name="credit_card_no"
          value={formData.credit_card_no}
        />
        <Button>Submit</Button>
      </form>
      : <ErrorGeneric errMessage="Log in/register to continue" />
    }
  </>)
}
