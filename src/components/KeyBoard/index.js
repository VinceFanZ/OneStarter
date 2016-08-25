import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import Item from './Item'

@autobind
class KeyBoard extends React.Component {
  static propTypes = {
    initKeyPress: PropTypes.array.isRequired,
    bridgeKeyBoard: PropTypes.func.isRequired
  }
  state = {
    keyPress: (this.props.initKeyPress || ['', '', '', '', '', ''])
  }
  inputDispose(cell) {
    switch (cell.content) {
      case 'clear':
        this.decrement()
        break
      case 'empty':
        return
      case 'zero':
        this.increment(0)
        break
      default:
        this.increment(cell.content)
    }
    this.props.bridgeKeyBoard(this.state.keyPress)
  }
  increment(increment) {
    const { keyPress } = this.state
    const newKeyPress = (() => {
      if (keyPress[keyPress.length - 1] === '') {
        keyPress[keyPress.indexOf('')] = increment
      }
      return keyPress
    })()
    this.setState({
      keyPress: newKeyPress
    })
  }
  decrement() {
    const { keyPress } = this.state
    const newKeyPress = (() => {
      if (keyPress[0] !== '') {
        keyPress[keyPress.indexOf('') === -1 ? keyPress.length - 1 : keyPress.indexOf('') - 1] = ''
      }
      return keyPress
    })()
    this.setState({
      keyPress: newKeyPress
    })
  }
  render() {
    const colls = [
      [{
        content: 1,
        suffix: ''
      }, {
        content: 2,
        suffix: 'ABC'
      }, {
        content: 3,
        suffix: 'DEF'
      }],
      [{
        content: 4,
        suffix: 'GHI'
      }, {
        content: 5,
        suffix: 'JKL'
      }, {
        content: 6,
        suffix: 'MNO'
      }],
      [{
        content: 7,
        suffix: 'PQRS'
      }, {
        content: 8,
        suffix: 'TUV'
      }, {
        content: 9,
        suffix: 'WXYZ'
      }],
      [{
        content: 'empty'
      }, {
        content: 'zero',
        suffix: ''
      }, {
        content: 'clear'
      }]
    ]

    return (
      <div className="keyboard">
        {
        colls.map((row, index) =>
          <ul key={index} className="keyboard-row">
            {
            row.map((cell, rowIndex) =>
              <Item
                key={rowIndex}
                cell={cell}
                bridge={this.inputDispose}
              />
            )
            }
          </ul>
        )
      }
      </div>
    )
  }
}
export default KeyBoard
