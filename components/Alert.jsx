import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  title: 'Начало игры подразумевает непрерывное прохождение на протяжении длительного времени, продолжить?',
  onClick: () => {},
};

class Alert extends React.Component {
  constructor() {
    super();
    this.hideAlert = this.hideAlert.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      visible: false,
      submitted: false,
    };
    this.alert = React.createRef();
  }

  showAlert() {
    this.setState({ visible: true });
  }

  hideAlert() {
    this.setState({ visible: false });
  }

  submit() {
    const { onClick } = this.props;
    this.setState({ submitted: true });
    setTimeout(() => {
      onClick();
      this.setState({ visible: false });
    }, 500);
  }

  render() {
    const { title } = this.props;
    const { visible, submitted } = this.state;
    return (
      <section
        className={`Alert ${visible ? 'Alert--visible' : ''} ${submitted ? 'submitted' : ''}`}
        ref={this.alert}
      >
        <div className="Alert__title">{title}</div>
        <Button
          onClick={this.hideAlert}
          className="button button-main button-main-red button-main-red-colorful button"
          title="Отмена"
        />
        <Button
          onClick={this.submit}
          className="button button-info button"
          title="Продолжить"
        />
      </section>
    );
  }
}


Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
