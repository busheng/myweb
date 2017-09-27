import React from 'react';
import Paper from 'material-ui/Paper';
import './_Card.scss'
import RaisedButton from 'material-ui/RaisedButton';
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom';
import Popup from './Popup'
import SkyLight from 'react-skylight';

const paperStyle = {
  height: 400,
  width: 400,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const buttonStyle = {
  margin: 12,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.26)',
};

const popupStyle = {
  backgroundColor: '#80bfff',
  color: '#000000',
  width: '35%',
  height: '350px',
  marginTop: '-200px',
  marginLeft: '-20%',

};

const labelStyle = {
  fontWeight: 'bold',
}

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: props.yearData.year,
      regularCount: props.yearData.regular,
      masterCount: props.yearData.master,
      totalRecieved: props.yearData.received,
      webLink: props.yearData.web,
      showPopup: false,
      paperHeight: 400,
      paperWidth: 400,
      paperMarginLeft: 10,
      paperMarhinRight: 10,
      colorKey: 0,
    };
  }
  
  updateDimensions() {
    if (window.innerWidth < 600) {
      let update_size  = (window.innerWidth-20);
      let margin = update_size > 400? (window.innerWidth-400)/2:10
      update_size = update_size > 400 ? 400: update_size;
      let height = update_size > 350? update_size: 700 - update_size;
      this.setState({ 
        paperHeight: height, 
        paperWidth: update_size, 
        paperMarginLeft: margin,
        paperMarginRight: margin,
        colorKey: 0,
      });
    } else if (window.innerWidth < 1100) {
      let update_size  = (window.innerWidth-80) / 2;
      let margin = update_size > 400? (window.innerWidth-800)/6:10
      update_size = update_size > 400 ? 400: update_size;
      let height = update_size > 350? update_size: 700 - update_size;
      this.setState({ 
        paperHeight: height, 
        paperWidth: update_size, 
        paperMarginLeft: margin,
        paperMarginRight: margin,
        colorKey: 1,
      });
    } else {
      let update_size  = (window.innerWidth-100) / 3;
      this.setState({ paperHeight: update_size, paperWidth: update_size});
      let height = update_size > 350? update_size: 700 - update_size;
      this.setState({ 
        paperHeight: height, 
        paperWidth: update_size, 
        paperMarginLeft: 10,
        paperMarginRight: 10,
        colorKey: 0,
      });
    }
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

    componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const {
      year, 
      regularCount, 
      masterCount, 
      totalRecieved, 
      webLink, 
      paperHeight, 
      paperWidth, 
      paperMarginLeft, 
      paperMarginRight,
      colorKey
    } = this.state

    const enText =[
      'Total available h1b count',
      'Total Cap Count',
      'Available h1b count for bachelor degree or below',
      'Regular Cap',
      'Available h1b count for master degree or above',
      'Master’s Exemption',
      'Total number of h1b applicants',
      'Total received',
      'If you own a bachelor degre or below',
      'Regular Cap chosen probability',
      'If you own a master degree or above',
      'Master chosen probability',
      'larger than',
      'Calculate the probability of master degree',
      'Calculate More',
      'USCIS Link',
      'Calculate Master Degree Chosen Probability',
    ]

    const cnText =[
      '总共发放的h1b名额',
      '总发放名额',
      '学士学位及以下的h1b名额数目',
      '普通名额',
      '研究生学位及以上的h1b名额数目',
      '研究生额外名额',
      '总共收到的h1b申请数目',
      'h1b总计申请数目',
      '如果你拥有学士学位及以下',
      '普通名额抽中概率',
      '如果你拥有研究生学位及以上',
      '研究生及以上抽中概率',
      "大于",
      '计算研究生学位及以上的抽中概率',
      '精确计算',
      'USCIS 链接',
      '计算研究生学位及以上的抽中概率',
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

     const key = this.props.index;
    
    paperStyle.backgroundColor = colorKey?
      (key%4==1 || key%4==2)? '#E8E8E8':'#e5f9ff':
      key%2 ? '#E8E8E8': '#e5f9ff'
    
    paperStyle.height = paperHeight 
    paperStyle.width = paperWidth
    paperStyle.marginLeft = paperMarginLeft
    paperStyle.marginRight = paperMarginRight
    
    const regularProb = (regularCount/(totalRecieved - masterCount)*100).toFixed(2)
    return (
      <div>
        <Paper style={paperStyle} zDepth={2}> 
        <h1>H1B {year} </h1>
        <div className='count'>
          <div className='total-count' data-tip={text[0]}>
            <div>{text[1]}: </div> 
            <div><p className='number' style={{fontSize:20, textShadow: '1px 1px rgba(0, 0, 0, 0.26)'}} >{this.numberWithCommas(regularCount + masterCount)}</p> </div>
          </div>
          <div className='cap-count'>
            <div data-tip={text[2]}>
              <p className='cap-text'>{text[3]}: </p><p className='number'>{this.numberWithCommas(regularCount)}</p>
            </div>
            <div data-tip={text[4]}>
              <p className='cap-text'>{text[5]}: </p><p className='number'>{this.numberWithCommas(masterCount)}</p>
            </div>
          </div>
        </div>

        <div data-tip={text[6]}>{text[7]}: 
          <p className='number' style={{fontSize:30, textShadow: '2px 2px rgba(0, 0, 0, 0.15)'}}>
            {this.numberWithCommas(totalRecieved)}
          </p>
        </div>
        
        <div data-tip={text[8]} >{text[9]}: 
          <p className='number' style={{fontSize:25, textShadow: '2px 2px rgba(0, 0, 0, 0.1)'}}>
            {regularProb}%
          </p>
        </div>
        <div data-tip={text[10]}>{text[11]}: <p className='number'>{text[12]} {regularProb}%</p>
            <RaisedButton 
              data-tip={text[13]}
              label={text[14]}
              style={buttonStyle} 
              labelStyle={labelStyle}
              onClick={() => this.animated.show()}
            />
        </div>
        <ReactTooltip />
        <div className='link'> <a href={webLink} target="_blank">{text[15]}</a></div>
        </Paper>
        <SkyLight 
          dialogStyles={popupStyle}
          hideOnOverlayClicked 
          ref={ref => this.animated = ref} 
          title={text[16]}
          transitionDuration={300} 
        >
          <Popup yearData={this.props.yearData} lang={this.props.lang}/>
        </SkyLight>
      </div>
    )
  }
}
