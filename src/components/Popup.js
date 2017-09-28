import React from 'react';
import NumericInput from 'react-numeric-input';
import './_Popup.scss'
import Icon from 'react-icon-base'

const style = {
  margin: 30,
  wrap: {
      background: '#E2E2E2',
      boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
      padding: '2px 2.26ex 2px 2px',
      borderRadius: '6px 3px 3px 6px',
      fontSize: 20
  }
}

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: props.yearData.year,
      regularCount: props.yearData.regular,
      masterCount: props.yearData.master,
      totalRecieved: props.yearData.received,
      webLink: props.yearData.web,
      showPopup: false,
      masterNum: 50000,
    };
    this.setNewProb=this.setNewProb.bind(this)
    this.calProb=this.calProb.bind(this)
  }

  setNewProb(masterNum) {
    this.setState({ 
      masterNum: masterNum
    })
  }

  calProb(masterNum) {
    const {year, regularCount, masterCount, totalRecieved, webLink} = this.state
    let prob;
    prob = masterCount / masterNum + (1 - masterCount / masterNum) * (regularCount / (totalRecieved - masterCount))
    prob = prob > 1? 1 : prob
    return prob
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const enText =[
      'Available Master Degree Count',
      'Total Available Count(include Master Degree Count)',
      'Total Recieved Applicants',
      'Master Degree Applicants You guess',
      'Master Chosen Probability',
      'Probability is calculated via (masterCount/masterApplicants) + (1 - (masterCount/masterApplicants)) * (regularCount/(totalRecieved - masterCount))'
    ]

    const cnText =[
      '研究生额外发放名额',
      '总发放名额(含研究生额外名额)',
      'h1b总计申请数目',
      '请预估研究生申请数目',
      '研究生及以上抽中概率',
      '概率计算方式: (研究生名额／研究生申请数) +（1 - (研究生名额／研究生申请数)）* (普通名额／(总申请数目 - 研究生名额))'
    ]

    let text;
    switch(this.props.lang) {
      case "en":
        text = enText;
        break;
      case "cn":
        text = cnText;
        break; 
      default:
        text = enText; 
    };

    const {year, regularCount, masterCount, totalRecieved, webLink, masterNum} = this.state
    const questIcon =  (
      <Icon viewBox="0 0 40 40" size={20}>
          <g><path d="m23 30.7v-4.3q0-0.3-0.2-0.5t-0.5-0.2h-4.3q-0.3 0-0.5 0.2t-0.2 0.5v4.3q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5z m5.7-15q0-2-1.2-3.6t-3.1-2.6-3.8-0.9q-5.4 0-8.3 4.7-0.3 0.6 0.2 1l2.9 2.2q0.2 0.1 0.5 0.1 0.3 0 0.5-0.2 1.2-1.6 1.9-2.1 0.8-0.5 2-0.5 1 0 1.9 0.6t0.8 1.3q0 0.8-0.4 1.3t-1.6 1q-1.4 0.7-2.5 2t-1.2 2.8v0.8q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5q0-0.5 0.5-1.1t1.2-1.1q0.7-0.4 1.1-0.7t1-0.8 1-1 0.6-1.4 0.3-1.8z m8.6 4.3q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"/></g>
      </Icon>
    )

    return (
      <div>
        <h1> H1B {year} </h1>
        <div >
          <div>{text[0]}: <p className='number' style={{fontSize:25}}>{this.numberWithCommas(masterCount)}</p> </div>
        </div>

        <div >
          <div>{text[1]}: <p className='number' style={{fontSize:25}}>{this.numberWithCommas(regularCount + masterCount)}</p> </div>
        </div>

        <div >
          <div>{text[2]}: <p className='number' style={{fontSize:25}}>{this.numberWithCommas(totalRecieved)}</p> </div>
        </div>
        <div style={{ marginTop: 10}}>{text[3]}: &nbsp;
          <NumericInput 
            min={0} 
            max={totalRecieved} 
            value={masterNum} 
            size={10}
            step={1000}
            onChange={this.setNewProb}
            style={style}
          />
        </div>
        <div>{text[4]}: <p className='number' style={{fontSize:35, textShadow: '2px 2px rgba(0, 0, 0, 0.15)'}}>{(this.calProb(masterNum)*100).toFixed(2)}% </p></div>
        <div style={{float: 'right'}} data-tip={text[5]} data-event='click focus'> {questIcon} </div>
      </div>
    );
  }
}