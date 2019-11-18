import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import SectionTitle from '../../components/misc/SectionTitle';
import {Button} from 'react-bootstrap';
import Loader from '../misc/Loader';

function ResgisterModal({icon = 'plus-circle', enableDelete = false, onDelete, ...props}) {
  const [loaded, setLoaded] = useState(true);

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Body>
          <SectionTitle icon={icon} title={props.title} subtitle={props.subtitle}/>

          <div className='mt-3 py-3 bg-white'>
            {props.children}
          </div>

          <div className='py-1'>
            {(loaded ?
              <></> :
              <Loader message='Salvando...' size='40px' />
            )}  
          </div>

          <div className="text-right mt-3">
            {enableDelete ? <div onClick={onDelete} className='mr-4 text-danger d-inline-block hover-pointer'>Excluir</div> : <></>}
            <Button onClick={props.cancel} className='mr-2' variant='secondary'>Cancelar</Button>
            <Button onClick={() => { setLoaded(false); props.save(); }} variant='primary'>Salvar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ResgisterModal;
