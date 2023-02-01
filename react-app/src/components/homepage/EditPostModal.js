import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from './EditPostForm';

function EditPostModal(post) {
  const [showModal, setShowModal] = useState(false);
  console.log('Posts', post)
//   console.log('Post', post)
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm setShowModal={setShowModal} post={post}
          onModalClose={()=>setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
