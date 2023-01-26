import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    // setEmail('demo@aa.io')
    // setPassword('password')
    let demoEmail = 'demo@aa.io'
    let demoPw = 'password'
    const demo = await dispatch(login(demoEmail, demoPw))
    if (demo) {
      setErrors(demo);
    }
  }

  const signUp = () => {
    return history.push('/sign-up')
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='homepage'>
      <div className='left-home-div'>
        <h1 id='header'>BeFriends</h1>
        <h2 id='subheader'>Recent Logins</h2>
        <p id='subtext'>Click your picture or add an account.</p>
        <div className='recent-log-in'>
          <button onClick={demoUser}>Demo User</button>
        </div>
      </div>
      <div className='log-in-form'>
        <form onSubmit={onLogin}>
          <div>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required
              id='email-input'
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
              id='password-input'
            />
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <button type='submit' id='log-in-button'>Log In</button>
            <p id='my-link'>Placeholder / link to my site?</p>
          </div>
        </form>
        <div>
                {/* make this a modal */}
              <button onClick={signUp} id='sign-up'>Create new account</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
