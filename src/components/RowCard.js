import React from 'react';
import Card from './Card'
import './_RowCard.scss'

export default class RowCard extends React.Component {
  render() {
    const data = this.props.data
    return (
      <div className="rowcard">
        {
          data.map((yearData, index) => {
            return (
              <Card 
                yearData = {yearData} 
                key={index} 
                index={index}
                lang={this.props.lang}
              />
            )
          })
        }
      </div>
    )
  }
}
