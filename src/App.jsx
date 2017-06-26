import React from 'react'
import AppBar from 'material-ui/AppBar';
import Content from './components/Content'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="H1b numbers" />
        <Content/>
      </div>
    )
  }
}
