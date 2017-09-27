import React from 'react'
import AppBar from 'material-ui/AppBar';
import Content from './components/Content';
import ShareFoot from './components/ShareFoot';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import {Icon_Flag_US} from 'material-ui-country-flags';

const style={
  backgroundColor: '#4da6ff',
}

export default class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
    };
    this.changeToEnglish=this.changeToEnglish.bind(this);
    this.changeToChinese=this.changeToChinese.bind(this);
  }

  changeToEnglish() {
    this.setState({lang: 'en'});
  }

  changeToChinese() {
    this.setState({lang: 'cn'});
  }

  render() {
    const cnFlagIcon = (
      <SvgIcon viewBox="0 0 320 240" >
      <g transform="matrix(.48 0 0 .48 -2.6 2.39)">
        <defs>
          <path id="a" fill="#ffde00" d="M-.588.81L0-1 .588.81-.952-.31H.952z"/>
        </defs>
        <path d="M0 0h640v480H0z" fill="#de2910"/>
        <use xlinkHref="#a" transform="matrix(71.9991 0 0 72 119.999 120)" width="30" height="20"/>
        <use xlinkHref="#a" transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.291 47.996)" width="30" height="20"/>
        <use xlinkHref="#a" transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 287.95 95.796)" width="30" height="20"/>
        <use xlinkHref="#a" transform="matrix(6.5991 -23.0749 23.0746 6.59919 287.959 168.012)" width="30" height="20"/>
        <use xlinkHref="#a" transform="matrix(14.9991 -18.73557 18.73533 14.99929 239.933 216.054)" width="30" height="20"/>
      </g>
      </SvgIcon>
    )

    const rightButtons = (
      <div>
        <IconButton onClick={this.changeToEnglish} tooltip="Use English"><Icon_Flag_US /></IconButton>
       <IconButton onClick={this.changeToChinese} tooltip="使用中文">{cnFlagIcon}</IconButton>
      </div>
    );

    const lang = this.state.lang
    let title;
    let author;
    if(lang == 'cn') {
      title = "H1B 抽中概率"
      author = "作者"
    } else {
      title = "H1b Chosen Probability"
      author = "Author" 
    }
    return (
      <div>
        <AppBar 
          title = {title} 
          showMenuIconButton={false} 
          style={style}
          iconElementRight={rightButtons}
        />
        <Content lang={lang}/>
        <div>
          <div style={{ textAlign: 'center', marginTop: 20}}><ShareFoot title={title}/></div>
          <div style={{ textAlign: 'right', marginRight: 20, marginBottom: 20}} >{author}: <a href='https://about.me/busheng'>Busheng Lou</a></div>
        </div>  
      </div>
    )
  }
}
