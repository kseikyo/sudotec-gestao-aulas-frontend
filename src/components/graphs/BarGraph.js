import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class BarGraph extends React.Component {
  render() {
    return (
      <>
        <Doughnut {...this.props}/>
      </>
    );
  }
};