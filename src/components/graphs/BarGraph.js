import React from 'react';
import { Bar } from 'react-chartjs-2';
import BlockContent from '..//misc/BlockContent';

function Title({children}) {
  return (
      <h5 className='font-weight-bold text-primary'>{children}</h5>
  );
}

export default class BarGraph extends React.Component {
  render() {
    return (
      <>
      <BlockContent>
        <Title>{this.props.title}</Title>
        <Bar {...this.props}/>
      </BlockContent>
      </>
    );
  }
};