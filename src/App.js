import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as classnames from 'classnames';


import * as actions from './actions'
import './App.scss';

class App extends Component {
  render() {
      const {fields, step, actions} = this.props,
          {move, shuffle, backward} = actions;

      return (
          <div className="App">
              <table className={'table'}>
                <tbody>{
                    fields.map( (row, index) => (
                        <tr key={`row${index}`}>{
                          row.map( (item, index) => item
                              ? <td key={`cell${index}`}>
                                  <div onClick={() => move(item)} className={'chip'}>
                                      {item}
                                  </div>
                                </td>
                              : <td key={`cell${index}`}/>
                          )
                        }</tr>
                    ))
                }</tbody>
              </table>
              <div className={'control'}>
                  <div className={classnames({'disabled': !step})} onClick={() => backward()}>BACKWARD</div>
                  <div onClick={() => shuffle()}>SHUFFLE</div>
              </div>
          </div>
      );
  }
}

export default connect(state => state, dispatch => ({actions: bindActionCreators(actions, dispatch)}))(App)
