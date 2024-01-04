import React, { useState } from 'react';

import Container from "./components/Container/Container";
import { GlobalStyle } from './theme/theme';
import './App.css'; // You can create a CSS file for styling
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

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
       <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-end p-4">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">LOGO</h2>
            <p className="text-gray-700">Welcome Back</p>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                User Name
              </label>
              <Input className="mt-1" id="username" placeholder="hannah.green@test.com" type="email" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <Input className="mt-1" id="password" placeholder="Password123@" type="password" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="security-text">
                Security Text
              </label>
              <div className="flex mt-1">
                <Input className="flex-grow mr-2" id="security-text" placeholder="Enter the shown text" />
                <Button className="flex-shrink-0" variant="outline">
                  mKfxC
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                  Remember me on this computer
                </label>
              </div>
              <Link className="text-sm text-blue-600 hover:underline" href="#">
                Forgot Password?
              </Link>
            </div>
            <Button className="w-full">LOG IN</Button>
          </form>
        </div>
      </div>
    </div>
      {/* <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={updatePassword}
      />

      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="strength-section"
          style={{ backgroundColor: getPasswordColor(strength, index) }}
        ></div>
      ))} */}
       <GlobalStyle />
    </Container>
  );
};

export default App;
