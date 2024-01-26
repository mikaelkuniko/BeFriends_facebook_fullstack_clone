import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm';
import './CreatePostModal.css'


function CreatePostModal(user) {
  const [showModal, setShowModal] = useState(false);
  // console.log('Users', user.user)
  return (
    <>
      <button id='create-post-button' onClick={() => setShowModal(true)}>{`What's on your mind, ${user.user.first_name}?`}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm setShowModal={setShowModal}
          onModalClose={()=>setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
