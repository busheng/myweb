import React from 'react'
import AppBar from 'material-ui/AppBar';
import Content from './components/Content'

const style={
  backgroundColor: '#4da6ff',
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="H1b numbers" showMenuIconButton={false} style={style}/>
        <Content/>
        <div style={{ textAlign: 'center'}}>
          Author: <a href='https://about.me/busheng'>Busheng Lou</a>
        </div>  
      </div>
    )
  }
}
