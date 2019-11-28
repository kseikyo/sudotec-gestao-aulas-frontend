import React, { Component } from 'react'
import statsAPI from '../../services/api/stats';
import PageTitle from '../../components/misc/PageTitle';
import Loader from '../../components/misc/Loader';
import RegisterModal from '../../components/misc/RegisterModal';
import DonutGraph from '../../components/graphs/DonutGraph';
import BarGraph from '../../components/graphs/BarGraph';
import {Button, Table} from 'react-bootstrap';
import ReportModal from '../../components/misc/ReportModal';

export default class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: {},
            ages: {},
            loaded: false,
            genderRes: {},
            agesRes: {},
        }

        this.print = React.createRef()
    }

    componentDidMount() {
        this.updateCourse();
    }

    updateCourse() {
        statsAPI.get().then(res => {
            let gender = this.formatGender(res.data.gender);
            let ages = this.formatAges(res.data.ages);
            
            this.setState({
                genderRes: res.data.gender,
                agesRes: res.data.ages,
                gender,
                ages,
                loaded: true,
                showReportModal: false,
            });
        });
    }

    formatAges(ages) {
        let result = {
            labels: Object.keys(ages),
            datasets: [
              {
                label: 'Total',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Object.values(ages),
              }
            ]
        };

        return result;
    }

    formatGender(gender) {
        let result = {};

        result.datasets = [{
            data: [gender.F, gender.M],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackground: ['#FF6384', '#36A2EB']
        }];
        
        result.labels = ['Feminino', 'Masculino'];

        return result;
    }

    toggleModal() {
        this.setState({showReportModal: !this.state.showReportModal});
    }

    render() {
        let { gender, ages, loaded, genderRes, agesRes } = this.state;

        if (!loaded) {
            return <Loader/>
        }
        return (
            <>
                <div className='d-flex'>
                    <PageTitle title='Dashboard' />
                    <div className="ml-auto">
                        <Button variant='primary' onClick={this.toggleModal.bind(this)} className='text-shadow'>Relatório</Button>
                        <ReportModal title='Relatório geral dos alunos' show={this.state.showReportModal} close={this.toggleModal.bind(this)}>
                            <div>
                                <h5>Gênero</h5>
                                <div>Feminino: {genderRes.F}</div> 
                                <div>Masculino: {genderRes.M}</div> 
                            </div>
                            <div className='mt-4'>
                                <h5>Idades</h5>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Faixa de idade</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(agesRes).map(key => 
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{agesRes[key]}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>

                        </ReportModal>
                    </div>
                </div>

                <div className='dashboard-grid' ref={this.print}>
                    <DonutGraph title='Gênero' height={200} data={gender} />
                    <BarGraph title='Idade' data={ages} />
                </div>
            </>
        )
    }
}
