import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import * as actions from './actions'
import './App.scss';

class App extends Component {
  render() {
      const {fields} = this.props,
          {move, shuffle, backward} = this.props.actions;

      return (
          <div className="App">
              <div className={'control'}>
                <div onClick={() => shuffle()}>SHUFFLE</div>
                <div onClick={() => backward()}>BACKWARD</div>
              </div>
              <table className={'table'}>
                    <tbody>
                    {
                        fields.map(row => (
                            <tr>
                            {
                              row.map(item => item
                                  ? <td><div onClick={() => move(item)} className={'chip'}>{item}</div></td>
                                  : <td/>
                              )
                            }
                            </tr>
                        ))
                    }
                    </tbody>
              </table>
          </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(state => state, mapDispatchToProps)(App)
