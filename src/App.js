import React, { useState } from 'react';
import Container from "./components/Container/Container";
import { GlobalStyle } from './theme/theme';
import './App.css'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { toast } from 'react-toastify';
import passwordValidator from 'password-validator'; 

const App = () => {
    const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('');
  
   const schema = new passwordValidator();

    // Додаємо правила для перевірки пароля
    schema
        .is().min(8)                                    // Мінімальна довжина 8 символів
        .is().max(100)                                  // Максимальна довжина 100 символів
      .has().uppercase()                              // Має містити принаймні одну велику літеру
       .has().symbols()  
        .has().lowercase()                              // Має містити принаймні одну маленьку літеру
        .has().digits()                                 // Має містити принаймні одну цифру
        .has().not().spaces()                           // Не має містити пробілів
        .is().not().oneOf(['Password123', 'qwerty123']); // Не має бути одним з вказаних паролів


    const calculatePasswordStrength = (password) => {
        if (password.length === 0) {
            return 'empty';
        } else if (password.length < 8) {
            return 'weak';
        } else if (/^[a-zA-Z]+$/.test(password) || /^\d+$/.test(password) || /^[!@#$%^&*(),.?":{}|<>]+$/.test(password)) {
            return 'easy';
        } else if (/^[a-zA-Z\d]+$/.test(password) || /^[a-zA-Z!@#$%^&*(),.?":{}|<>]+$/.test(password) || /^[\d!@#$%^&*(),.?":{}|<>]+$/.test(password)) {
            return 'medium';
        } else {
            return 'strong';
        }
    };

    const getPasswordColor = (strength, index) => {
        switch (strength) {
            case 'empty':
                return 'gray';
            case 'weak':
                return 'red';
            case 'easy':
                return index === 0 ? 'red' : 'gray';
            case 'medium':
                return index < 2 ? 'yellow' : 'gray';
            case 'strong':
                return 'green';
            default:
                return 'gray';
        }
    };

    const updatePassword = (event) => {
      const newPassword = event.target.value;
      if (newPassword.length > 1) {
          const validCharacters = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
          if (!validCharacters.test(newPassword)) {
              toast.error("Password must contain only English letters");
              return;
          }
      }

      setPassword(newPassword);

        const passwordStrength = calculatePasswordStrength(newPassword);
        setPasswordType('')
        switch (passwordStrength) {
            case 'empty':
            setPasswordType('');
                break;
          case 'weak':
            toast.error(`Password  too short. It must be at least 8 characters`);
            setPasswordType('Password is weak');
                break;
          case 'easy':
            toast.warn(`This password is little secure.`);
            setPasswordType('Password is easy');
                break;
          case 'medium':
            toast.warn(`This password is little secure.`);
            setPasswordType('Password is medium');
                break;
          case 'strong':
            toast.success(`Your password is strong`);
            setPasswordType('Password is strong');
                break;
            default:
                setPasswordType('');
        }
        setPasswordType(passwordType);
    };

    const strength = calculatePasswordStrength(password);

    let str ="Hello JavaScript!";
str.replace("JavaScript", "ECMAScript");
console.log(str);

    return (
        <Container>
            <div style={{display: 'flex'}}>
          <div>Image</div>
          <div>
            <h1>Check your password</h1>
            <p>Your password is not safe if it can be brute-forced or found in a database of leaked passwords.</p>
            <p>We do not collect or store your passwords.</p>
            <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField fullWidth label="Test your password"
                               id="fullWidth"
                               name="password"
                               value={password}
                               onChange={updatePassword}/>
                    <div><p>{passwordType}</p></div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    {[0, 1, 2].map((index) => (
        <div
            key={index}
            className="strength-section"
            style={{ backgroundColor: getPasswordColor(strength, index), marginRight: '5px', 
                flex: '1'}}
        ></div>
    ))}
</div>
                </Box>
          </div>
        </div>
         <footer><h2>Protect your privacy online</h2></footer>
            <GlobalStyle />
        </Container>
    );
};

export default App;
