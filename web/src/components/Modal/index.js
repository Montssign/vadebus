import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md';

import modalContext from './modalContext';
import { Container, Background, Button } from './styles';

function Modal() {
  const modal = useContext(modalContext);
  function closeModal() {
    modal.setActive(false);
    modal.setContent(<></>);
  }

  return (
    <Container active={modal.active}>
      <Background onClick={closeModal} />
      <div>
        <Button onClick={closeModal}>
          <MdClose size={25} className="modal-close-icon" />
        </Button>
        {modal.Content || <></>}
      </div>
    </Container>
  );
}

export default Modal;
