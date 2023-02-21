import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState('')

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      birthday: `${birthMonth} ${birthDate}, ${birthYear}`,
      gender
    }
    if(password !== repeatPassword){
      alert("Confirmation password must match password.")
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, gender));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/homepage' />;
  }

  return (
    <div className='sign-up-form-div'>
      <div className='signup-text'>
        <h1 id='title'>Sign Up</h1>
        <h4 id='signup-subtext'>It's quick and easy.</h4>
      </div>
      <form onSubmit={onSignUp} className='sign-up-form'>
        <div className='names'>
          <input
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder='First Name'
            required
            className='fields'
          >
          </input>
          <input
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder='Last Name'
            required
            className='fields'
          ></input>
        </div>
        <div>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            placeholder='Email'
            value={email}
            className='fields'
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            placeholder='Password'
            value={password}
            className='fields'
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Confirm Password'
            className='fields'
          ></input>
        </div>
        <p className='subtitle'>Gender</p>
        <div className="gender-radio" onChange={(e) => setGender(e.target.value)}>
          <label className="genders">Female
            <input type="radio" id="female" name="gender" value="female" />
          </label>
          <label className="genders">Male
            <input type="radio" id="male" name="gender" value="male" />
          </label>
          <label className="genders">Other
            <input type="radio" id="other" name="gender" value="other" />
          </label>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <button id='sign-up-button' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
