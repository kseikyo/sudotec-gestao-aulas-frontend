import React from 'react';
import Content from '../../components/misc/content';
import SectionTitle from '../../components/misc/SectionTitle';
// import {Button} from 'react-bootstrap';
import GlyphButton from '../../components/misc/GlyphButton';

class Projects extends React.Component {
    render() {
        return(
          <div> 
            <Content>
              <div className="d-flex">
                <SectionTitle icon="project" title='Projetos'></SectionTitle>
                <div className="ml-auto">
                  <GlyphButton className="ml-auto">Novo projeto</GlyphButton>
                </div>
              </div>
            </Content>
          </div>
        );
    }
}

export default Projects;