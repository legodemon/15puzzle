import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classnames from 'classnames'

import * as actions from './actions'
import './App.scss'

class App extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      move: PropTypes.func.isRequired,
      shuffle: PropTypes.func.isRequired,
      backward: PropTypes.func.isRequired,
    }),
    store: PropTypes.shape({
      step: PropTypes.number.isRequired,
      fields: PropTypes.array.isRequired
    })
  }

  render() {
    const {store, actions} = this.props
    const {move, shuffle, backward} = actions
    const {fields, step} = store

    return (
      <div className="App">
        <table className={'table'}>
          <tbody>{
            fields.map((row, index) => (
              <tr key={`row${index}`}>{
                row.map((item, index) => item
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
    )
  }
}

export default connect(state => ({store: state}), dispatch => ({actions: bindActionCreators(actions, dispatch)}))(App)
