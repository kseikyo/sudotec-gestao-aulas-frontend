import React from 'react';
import Content from '../../components/misc/content';
import SectionTitle from '../../components/misc/SectionTitle';

class Projects extends React.Component {
    render() {
        return(
          <div> 
            <Content>
              <SectionTitle icon="project" title='Projetos' subtitle='Projetossss'></SectionTitle>
            </Content>
          </div>
        );
    }
}

export default Projects;