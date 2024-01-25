import React, { useState } from 'react';

import Container from "./components/Container/Container";
import { GlobalStyle } from './theme/theme';
import './App.css'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const App = () => {
  const [password, setPassword] = useState('');

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
    setPassword(newPassword);
  };

  const strength = calculatePasswordStrength(password);

  return (
    <Container>
      <div style={{display: 'flex'}}>
        <div>Image</div>
         <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
          <TextField fullWidth label="Password"
                  id="fullWidth"
                  name="password"
                  value={password}
                  onChange={updatePassword}/>

                {/* {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="strength-section"
                    style={{ backgroundColor: getPasswordColor(strength, index) }}
                  ></div>
                ))} */}
         </Box>
      </div>
      
       <GlobalStyle />
    </Container>
  );
};

export default App;
