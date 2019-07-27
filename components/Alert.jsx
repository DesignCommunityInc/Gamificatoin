import React from 'react'
import { PropTypes } from "prop-types";

const defaultProps = {
  title: "Начало игры подразумевает непрерывное прохождение на протяжении длительного времени, продолжить?",
  onClick: () => {
    return false;
  }
}

class Alert extends React.Component {
  constructor() {
    super();
    this.hideAlert = this.hideAlert.bind(this);
    this.submit = this.submit.bind(this);
  }
  showAlert() {
    this.alert.classList.add('Alert--visible')
  }
  hideAlert() {
    this.alert.classList.remove('Alert--visible');
  }
  submit() {
    this.alert.classList.add('submitted');
    setTimeout(() => {
      this.props.onClick();
      this.alert.classList.remove('Alert--visible');
    }, 500);
  }
  render() {
    const { title } = this.props;
    return (
      <section className="Alert"
        ref={(ref) => {
          this.alert = ref;
        }}>
        <div className="Alert__title">{title}</div>
        <span
          role="button"
          onClick={this.hideAlert}
          className="button button-main button-main-red button-main-red-colorful button-iconless">
          Отмена
        </span>
        <span
          role="button"
          onClick={this.submit}
          className="button button-info button-iconless">
          Продолжить
        </span>
      </section>
    )
  }
}


// Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;