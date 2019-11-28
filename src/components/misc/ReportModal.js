import React from 'react';
import {Modal} from 'react-bootstrap';
import SectionTitle from './SectionTitle';
import {Button} from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf';

function ReportModal({icon = 'lesson', filename = 'report.pdf', ...props}) {
  const printRef = React.createRef();

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Body className='p-0'>
          <div ref={printRef} className='p-4'>
            <SectionTitle icon={icon} title={props.title} subtitle={props.subtitle}/>

            <div className='mt-3 py-3 bg-white'>
              {props.children}
            </div>
          </div>

          <div className="text-right mt-3 px-4 pb-3">
            <Button onClick={props.cancel} className='mr-2' variant='secondary'>Cancelar</Button>
            <ReactToPdf targetRef={printRef} filename={filename}>
                {({toPdf}) => (
                <Button variant='primary' onClick={() => {toPdf(); props.close();} } className='text-shadow'>Salvar</Button>
                )}
            </ReactToPdf>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReportModal;
