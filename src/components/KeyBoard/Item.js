import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'

@autobind
class Item extends React.Component {
  static propTypes = {
    cell: PropTypes.object.isRequired,
    bridge: PropTypes.func.isRequired
  }
  onClickSquare() {
    const { cell, bridge } = this.props
    bridge(cell)
  }
  render() {
    const { cell } = this.props
    return (
      <li
        onTouchTap={this.onClickSquare}
        className={
          ((content) => {
            switch (content) {
              case 'clear':
                return 'clear gray'
              case 'empty':
                return 'gray'
              case 'zero':
                return 'zero'
              default:
                return ''
            }
          })(cell.content)
        }
      >
        {
          (cell.content !== 'clear') && (cell.content !== 'zero') && (cell.content !== 'empty') &&
            <div>
              <p className="number">{cell.content}</p>
              <p className="letter">{cell.suffix}</p>
            </div>
        } {
          cell.content === 'zero' &&
            <div><p>0</p></div>
        } {
          cell.content === 'clear' &&
            <div className="clearIcon"><i></i></div>
        }
      </li>
    )
  }
}

export default Item
