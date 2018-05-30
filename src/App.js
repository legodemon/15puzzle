import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
          <table className={'table'}>
            <tbody>
              <tr>
                  <td><div className={'chip'}>1</div></td>
                  <td><div className={'chip'}>2</div></td>
                  <td><div className={'chip'}>3</div></td>
                  <td><div className={'chip'}>4</div></td>
              </tr>
              <tr>
                  <td><div className={'chip'}>5</div></td>
                  <td><div className={'chip'}>6</div></td>
                  <td><div className={'chip'}>7</div></td>
                  <td><div className={'chip'}>8</div></td>
              </tr>
              <tr>
                  <td><div className={'chip'}>9</div></td>
                  <td><div className={'chip'}>10</div></td>
                  <td><div className={'chip'}>11</div></td>
                  <td><div className={'chip'}>12</div></td>
              </tr>
              <tr>
                  <td><div className={'chip'}>13</div></td>
                  <td><div className={'chip'}>14</div></td>
                  <td><div className={'chip'}>15</div></td>
                  <td/>
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;
