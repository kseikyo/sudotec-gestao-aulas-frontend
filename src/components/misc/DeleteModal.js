import React from 'react';
import {Modal} from 'react-bootstrap';
import SectionTitle from './SectionTitle';
import {Button} from 'react-bootstrap';

function DeleteModal({show, onHide, onDelete, title = 'Confirmar exclusão', subtitle, ...props}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <SectionTitle icon='delete' title={title} subtitle={subtitle} variant='danger' />

        <div className='mt-3 py-3 bg-white'>
          {props.children}
        </div>

        <div className="text-right mt-3">
          <Button onClick={onHide} className='mr-2' variant='secondary'>Cancelar</Button>
          <Button onClick={onDelete} variant='danger'>Excluir</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
