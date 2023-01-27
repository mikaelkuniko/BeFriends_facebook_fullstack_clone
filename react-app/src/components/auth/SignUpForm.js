import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
    <form onSubmit={onSignUp}>
      <div>
        <input
          type='text'
          onChange={(e)=> setFirstName(e.target.value)}
          value={firstName}
          placeholder='First Name'
          required
        ></input>
        <input
          type='text'
          onChange={(e)=> setLastName(e.target.value)}
          value={lastName}
          placeholder='Last Name'
          required
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <p>Gender</p>
          <div id="gender" onChange={(e) => setGender(e.target.value)}>
            <label className="genders">Female
              <input type="radio" id="female" name="gender" value="female"/>
            </label>
            <label className="genders">Male
              <input type="radio" id="male" name="gender" value="male"/>
            </label>
            <label className="genders">Other
              <input type="radio" id="other" name="gender" value="other"/>
            </label>
          </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
