import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  questions: PropTypes.objectOf(PropTypes.array).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  animatedSubjectsCount: PropTypes.number.isRequired,
  isAnimated: PropTypes.bool.isRequired,
  visibility: PropTypes.bool.isRequired,
  chooseCategoryAsync: PropTypes.func.isRequired,
};

class Category extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activePreScreen: false,
    };
  }

  handleClick(e) {
    const category = e.target.getAttribute('id');
    this.setState({ activePreScreen: true });
    const { chooseCategoryAsync, questions } = this.props;
    chooseCategoryAsync({ category, questions });
  }

  render() {
    const {
      subjects,
      isAnimated,
      animatedSubjectsCount,
      visibility,
    } = this.props;
    const { activePreScreen } = this.state;
    return (
      <section className={`Game Game-fullscreen ${!visibility && 'unvisible'}`}>
        <div className={`choosing__category ${activePreScreen && 'choosing__category--active'}`}>Начало игры</div>
        <div
          className={!isAnimated ? 'Categories' : 'Categories Categories--animate'}
          ref={(ref) => {
            this.categoriesContainer = ref;
          }}
        >
          {subjects.map((subject, idx) => (
            <div
              key={subject}
              id={subject}
              className={animatedSubjectsCount >= idx ? 'Categories__unit Categories__unit--animate' : 'Categories__unit'}
              onClick={this.handleClick}
              onKeyDown={this.handleClick}
              role="button"
              tabIndex={idx}
            >
              {subject}
            </div>
          ))}
        </div>
      </section>
    );
  }
}

Category.propTypes = propTypes;

export default Category;
