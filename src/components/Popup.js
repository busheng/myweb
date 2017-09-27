import React from 'react';
import NumericInput from 'react-numeric-input';
import './_Popup.scss'

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
    ]

    const cnText =[
      '研究生额外发放名额',
      '总发放名额(含研究生额外名额)',
      'h1b总计申请数目',
      '请预估研究生申请数目',
      '研究生及以上抽中概率',
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
        <div >{text[4]}: <p className='number' style={{fontSize:35, textShadow: '2px 2px rgba(0, 0, 0, 0.15)'}}>{(this.calProb(masterNum)*100).toFixed(2)}% </p></div>
      </div>
    );
  }
}