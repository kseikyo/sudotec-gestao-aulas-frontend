import React from 'react';
import {Modal} from 'react-bootstrap';
import SectionTitle from '../../components/misc/SectionTitle';
import {Button} from 'react-bootstrap';

function ResgisterModal({icon = 'plus-circle', ...props}) {
  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Body>
          <SectionTitle icon={icon} title={props.title} subtitle={props.subtitle}/>

          <div className='mt-3 py-3 bg-white'>
            {props.children}
          </div>

          <div className="text-right mt-3">
            <div onClick={props.cancel} className='mr-4 text-danger d-inline-block'>Excluir</div>
            <Button onClick={props.cancel} className='mr-2' variant='secondary'>Cancelar</Button>
            <Button onClick={props.save} variant='primary'>Salvar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ResgisterModal;
