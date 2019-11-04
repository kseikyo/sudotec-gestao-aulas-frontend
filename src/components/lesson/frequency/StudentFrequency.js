import React, {useState} from 'react';
import Present from './Present';
import Justified from './Justified';
import Ausent from './Ausent';
import attendanceDefs from '../../../config/attendance';
import InfoButton from '../../../components/misc/InfoButton';

function Justification({student, attendance, onChange}) {
  let justification = attendance.justification;
  
  if (attendance.presence === attendanceDefs.JUSTIFIED) {
    return (
      <div className='pl-3'>        
        <div className='form-group mb-0 mt-3'>
          <input className='form-control' type='text' defaultValue={justification} onChange={(e) => onChange({student_id: attendance.student.id, presence: attendanceDefs.JUSTIFIED, justification: e.target.value})}></input>
          <label>Justificativa</label>
        </div>
      </div>
    )
  }

  return (<></>); 
}

function Details({show, student}) {  
  if (!show) {
    return <></>;
  }

  return (
    <div className='px-3 d-flex justify-content-between pt-2'>
      <div>
        <small className='text-black-50 d-block'>Nome da mãe</small>
        <small>{student.mother_name}</small>
      </div>  
      <div>
        <small className='text-black-50 d-block'>Telefone</small>
        <small>{student.phone}</small>
      </div>  
    </div>
  );
}

function StudentFrequency({attendance, onchange, ...rest}) {
  const [details, setDetails] = useState(false);
  let {student, presence} = attendance;
  let togglePresence = presence === attendanceDefs.PRESENT ? attendanceDefs.AUSENT : attendanceDefs.PRESENT;

  return (
    <div className={'student-set-frequency py-3 pr-3 ' + presence} onDoubleClick={() => onchange({student_id: student.id, presence: togglePresence})}>
      <div className='d-flex justify-content-between'>
      <div className='px-3 username'>{student.name}</div>
      <div>
        <Present onClick={() => onchange({student_id: student.id, presence: attendanceDefs.PRESENT})} disabled={presence !== attendanceDefs.PRESENT} />
        <Ausent onClick={() => onchange({student_id: student.id, presence: attendanceDefs.AUSENT})} disabled={presence !== attendanceDefs.AUSENT} />
        <Justified onClick={() => onchange({student_id: student.id, presence: attendanceDefs.JUSTIFIED})} disabled={presence !== attendanceDefs.JUSTIFIED} />
        <InfoButton onClick={() => setDetails(!details)} className='ml-2' />
      </div>
      </div>
        <Details show={details} student={student} />
        <Justification student={student} attendance={attendance} onChange={onchange} />
    </div>
  );
}

export default StudentFrequency;
