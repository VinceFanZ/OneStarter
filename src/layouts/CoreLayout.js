import React from 'react'

export default class CoreLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render() {
    return (
      <div className="page-container" style={{ marginTop: '0'}}>
        <div className="view-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
