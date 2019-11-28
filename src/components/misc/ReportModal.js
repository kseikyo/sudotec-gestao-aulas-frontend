import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import SectionTitle from './SectionTitle';
import {Button} from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf';

function ReportModal({icon = 'lesson', browserPrint = false, size = 'md', filename = 'report.pdf', ...props}) {
  const printRef = React.createRef();

  let options = {}; 
  
  useEffect(() => {
    if (printRef.current) {
      let width = printRef.current.clientWidth;
      let height = printRef.current.clientHeight;

      options.format = [width, height]
      options.unit = 'px';
      options.orientation = 'landscape'
    }
  });

  return (
    <>
      <Modal show={props.show} onHide={props.close} size={size}>
        <Modal.Body className='p-0'>
          <div ref={printRef} className='p-4'>
            <SectionTitle icon={icon} title={props.title} subtitle={props.subtitle}/>

            <div className='mt-3 pb-3 bg-white'>
              {props.children}
            </div>
          </div>

          <div className="text-right mt-3 px-4 pb-3 d-print-none">
            <Button onClick={props.close} className='mr-2' variant='secondary'>Cancelar</Button>
            <ReactToPdf targetRef={printRef} filename={filename} options={options}>
                {({toPdf}) => (
                <Button variant='primary' onClick={() => {
                  if (browserPrint) {
                    window.print();
                  } else {
                    toPdf();
                  }
                  props.close();} 
                } className='text-shadow'>Salvar</Button>
                )}
            </ReactToPdf>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReportModal;
