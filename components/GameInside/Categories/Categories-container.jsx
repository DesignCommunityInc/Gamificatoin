import React from 'react'
import { PropTypes } from "prop-types";

const propTypes = {
  // request: PropTypes.object.isRequired,
};
const defaultTypes = {
    // request: {},
};


class Category extends React.Component {
  constructor() {
    super();
    // this.state = {
    this.categories = [];
    // };
    this.handleClick = this.handleClick.bind(this);
  }
  // componentDidUpdate(previosProps, previosState) {
  //   // console.log(this.props.categories === previosProps.categories);
  //   if(this.state.categories.length === this.props.categories.length
  //     || previosProps.categories === this.props.categories) return false;
  //     this.interval = setInterval(() => {
  //       const { categories } = this.props;
  //       this.setState({ categories: [...this.state.categories, categories.shift()] });
  //       console.log(this.state.categories);
  //       if(!categories.length) clearInterval(this.interval);
  //   }, 300);
  // }
  componentDidUpdate() {
    if(this.categories.length === 0 || this.props.isCategoryChosen) return false;
    this.interval = setInterval(() => {
      let category = this.categories.shift();
      category.classList.add('Categories__unit--animate');
      console.log(this.categories);
      if(!this.categories.length) {
        clearInterval(this.interval)
        this.categoriesContainer.classList.add('Categories--animate');
      };
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleClick(e) {
    const target = e.target;
    const category = target.getAttribute("id");
    this.choosingContainer.innerHTML = category;
    this.choosingContainer.classList.add('choosing__category-active');
    setTimeout(() => {this.props.chooseCategory({ id: category })}, 2000);
  }
  render() {
    const { categories, isLoading, isCategoryChosen } = this.props;
    if(isLoading) return (
      <section className="Game Game-fullscreen">
        {/* <div className="background" /> */}
        <div 
          className="choosing__category"
          ref={(container) => {
            this.choosingContainer = container;
          }}
        />
      </section>
    );
    return(
      <section className={isCategoryChosen 
        ? "Game Game-fullscreen unvisible" 
        : "Game Game-fullscreen"}>
        <div 
          className="choosing__category"
          ref={(container) => {
            this.choosingContainer = container;
          }}
        />
        <div className="Categories"
          ref={(ref) => {
            this.categoriesContainer = ref;
          }}>
          {categories.map((category, idx) => 
            <div 
              key={idx}
              id={category.title}
              className="Categories__unit"
              onClick={this.handleClick}
              ref={(ref) => {
                this.categories.push(ref);
              }}>
              {category.title}
            </div>
          )}
        </div>
      </section>
    )
  }
}


Category.propTypes = propTypes;
Category.defaultTypes = defaultTypes;

export default Category;