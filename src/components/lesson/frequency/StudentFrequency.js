import React from 'react';
import Present from './Present';
import Justified from './Justified';
import Ausent from './Ausent';
import attendanceDefs from '../../../config/attendance';

function Justification({student, onchange, justification}) {
  if (student.presence === attendanceDefs.JUSTIFIED) {
    return (
      <div className='pl-3'>        
        <div className='form-group mb-0 mt-3'>
          <input className='form-control' type='text' defaultValue={student.justification ? student.justification : ''} onChange={(e) => onchange({student_id: student.student_id, presence: attendanceDefs.JUSTIFIED, justification: e.target.value})}></input>
          <label>Justificativa</label>
        </div>
      </div>
    )
  }

  return (<></>); 
}

function StudentFrequency({student, onchange, ...rest}) {
  let {student_id, name, presence} = student;
  let togglePresence = presence === attendanceDefs.PRESENT ? attendanceDefs.AUSENT : attendanceDefs.PRESENT;

  return (
    <div className={'student-frequency py-3 pr-3 ' + presence} onDoubleClick={() => onchange({student_id: student_id, presence: togglePresence})}>
      <div className='d-flex justify-content-between'>
        <div className='px-3 username'>{name}</div>
        <div>
          <Present onclick={() => onchange({student_id: student_id, presence: attendanceDefs.PRESENT})} disabled={presence !== attendanceDefs.PRESENT} />
          <Ausent onclick={() => onchange({student_id: student_id, presence: attendanceDefs.AUSENT})} disabled={presence !== attendanceDefs.AUSENT} />
          <Justified onclick={() => onchange({student_id: student_id, presence: attendanceDefs.JUSTIFIED})} disabled={presence !== attendanceDefs.JUSTIFIED} />
      </div>
      </div>
      <Justification student={student} onchange={onchange} />
    </div>
  );
}

export default StudentFrequency;
