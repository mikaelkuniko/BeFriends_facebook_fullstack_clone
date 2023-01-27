import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import './SignUpButton.css'

function SignupModal() {
  const [showModal, setShowModal] = useState();

  return (
    <div>
      <button id="signup" onClick={() => setShowModal(true)}>Create New Account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </div>
  );
}

export default SignupModal;
