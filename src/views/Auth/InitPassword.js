import React, { PropTypes } from 'react'
import { autobind } from 'core-decorators'
import Header from 'components/Header'
import KeyBoard from 'components/KeyBoard'

@autobind
class InitPassword extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  state = {
    payPassword: ['', '', '', '', '', ''],
    isFulfil: false
  }
  onClickBack() {
    this.context.router.replace({
      pathname: '/auth/bindCard'
    })
  }
  onClickFulfil() {
    if (this.state.isFulfil) {
      sessionStorage.setItem('setpwd', this.state.payPassword.join(''))
      this.context.router.replace({
        pathname: '/auth/confirmPwd'
      })
    }
  }
  handlePassword(newPayPassword) {
    this.setState({
      payPassword: newPayPassword
    })
    const { payPassword } = this.state
    if (payPassword[payPassword.length - 1] !== '') {
      this.setState({ isFulfil: true })
    } else {
      this.setState({ isFulfil: false })
    }
  }
  render() {
    const { title } = this.props.route
    return (
      <div>
        <Header isVisibility={!0} onClickBack={this.onClickBack} title={title} />
        <section className="auth-pwd__wrap">
          <p className="auth-pwd__sub-title">设置6位数字交易密码</p>
          <div className="passwordBox">
            {
              this.state.payPassword.map((item, index) =>
                <span key={index}>
                  { item !== '' ? <i></i> : ''}
                </span>
              )
            }
          </div>
          <div className="btn-horizontally auth-pwd__btn">
            <div
              className={this.state.isFulfil ? 'btn-sub' : 'btn-sub not-click'}
              onTouchTap={this.onClickFulfil}
            >
              下一步
            </div>
          </div>
        </section>
        <KeyBoard
          initKeyPress={this.state.payPassword}
          bridgeKeyBoard={this.handlePassword}
        />
      </div>
    )
  }
}

export default InitPassword
