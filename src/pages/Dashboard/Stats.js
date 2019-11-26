import React, { Component } from 'react'
import statsAPI from '../../services/api/stats';
import PageTitle from '../../components/misc/PageTitle';
import Loader from '../../components/misc/Loader';
import DonutGraph from '../../components/graphs/DonutGraph';

export default class Stats extends Component {
    state = {
        gender: {},
        loaded: false,
    }

    componentDidMount() {
        this.updateCourse();
    }

    updateCourse() {
        statsAPI.get().then(res => {
            let result = {};
            let gender = res.data.gender;

            result.datasets = [{
                data: [gender.F, gender.M],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackground: ['#FF6384', '#36A2EB']
            }];
            
            result.labels = ['Feminino', 'Masculino'];
            
            this.setState({
                gender: result,
                loaded: true
            });
        });
    }

    render() {
        let { gender, loaded } = this.state;

        if (!loaded) {
            return <Loader/>
        }
        return (
            <>
                <div className='d-flex'>
                    <PageTitle title='Dashboard' />
                </div>
                <div>

                <DonutGraph title='Gênero' height={200} data={gender} />
                
                </div>
            </>
        )
    }
}
