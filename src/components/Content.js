import React from 'react';
import RowCard from './RowCard';

export default class Content extends React.Component {
  render() {
    const data = require('../data/h1b-probability.json');
    return (
      <div>
        <RowCard data = {data} lang={this.props.lang}/>
      </div>
    )
  }
}
