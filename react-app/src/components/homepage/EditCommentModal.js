import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCommentForm from './EditCommentForm';

function EditCommentModal(comment) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm setShowModal={setShowModal} comment={comment}
          onModalClose={()=>setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
