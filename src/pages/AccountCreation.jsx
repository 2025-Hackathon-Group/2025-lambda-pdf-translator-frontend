import React from 'react';
import Navigation from '../components/Navigation';
import './AccountCreation.css';

function AccountCreation() {
  return (
    <>
      <Navigation />
      <div className="account-creation-container">
        <h1>Create Account</h1>
        <form>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </>
  );
}

export default AccountCreation;
