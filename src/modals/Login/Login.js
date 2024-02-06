import React, { useState, useReducer, useEffect, useContext } from 'react';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import classes from './Login.module.css';
import AuthContext from '../../store/auth-context';


function emailReducer(state, action) {
  console.log("emailAction", action, "\nemailState:", state)

  if (action.type === "EMAIL_INPUT") {
    return {
      value: action.payload.val,
      isValid: action.payload.val.includes('@')
    }
  }
  else if (action.type === "EMAIL_BLUR") {  // change state of isValid, hence CSS class
    return {
      value: state.value,                   // value remains the same
      isValid: state.value.includes('@')
    }
  }
  return { value: "", isValid: false }
}


function passwordReducer(state, action) {
  console.log("passAction:", action, "\npassState:", state)

  if (action.type === "PASS_INPUT") {
    return {
      value: action.payload.val,
      isValid: action.payload.val.length >= 7
    }
  }
  else if (action.type === "PASS_BLUR") {
    return {
      value: state.value,
      isValid: state.value.length >= 7
    }
  }
  return { value: "", isValid: false }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: false })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: false })

  // dependencies
  const { isValid: emailIsValid } = emailState
  const { isValid: passIsValid } = passwordState
  useEffect(() => {
    // Timeout
    const timeoutIdentifier = setTimeout(() => {
      console.log("Checking validity with delay")
      setFormIsValid(emailIsValid && passIsValid)
    }, 800)
    // Cleanup
    return () => {
      console.log("Cleaning up")
      clearTimeout(timeoutIdentifier)
    }
    // Dependencies - effect will run only if these have changed
  }, [emailIsValid, passIsValid])

  const ctx = useContext(AuthContext)


  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "EMAIL_INPUT",
      payload: { val: event.target.value }
    })
  };


  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "PASS_INPUT",
      payload: { val: event.target.value }
    })
  };


  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" })
  };


  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
    // useContext instead of props
    // props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
