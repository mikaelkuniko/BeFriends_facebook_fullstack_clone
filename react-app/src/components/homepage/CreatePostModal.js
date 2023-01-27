import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm';

function CreatePostModal(user) {
  const [showModal, setShowModal] = useState(false);
  console.log('Users', user.user)
  return (
    <>
      <button onClick={() => setShowModal(true)}>{`What's on your mind, ${user.user.first_name}?`}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
