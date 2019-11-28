import React, { Component } from 'react'
import statsAPI from '../../services/api/stats';
import PageTitle from '../../components/misc/PageTitle';
import Loader from '../../components/misc/Loader';
import DonutGraph from '../../components/graphs/DonutGraph';
import BarGraph from '../../components/graphs/BarGraph';
import {Button} from 'react-bootstrap';
import ReactToPdf from 'react-to-pdf';

export default class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: {},
            ages: {},
            loaded: false,
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
                gender,
                ages,
                loaded: true
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

    render() {
        let { gender, ages, loaded } = this.state;

        if (!loaded) {
            return <Loader/>
        }
        return (
            <>
                <div className='d-flex'>
                    <PageTitle title='Dashboard' />
                    <div className="ml-auto">
                    <ReactToPdf targetRef={this.print} filename="div-blue.pdf">
                        {({toPdf}) => (
                        <Button variant='primary' onClick={toPdf} className='text-shadow'>Imprimir</Button>
                        )}
                    </ReactToPdf>
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
