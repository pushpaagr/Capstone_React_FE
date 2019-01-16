import React, { Component } from 'react';
// import Recipe from './Recipe';
import PropTypes from 'prop-types';
import Myrecipe from './Myrecipe'
import './Myrecipes.css';

class Myrecipes extends Component {

  render() {
    const RecipeList = this.props.myrecipes.map((recipe, i) => {
      return (<Myrecipe
        key={i}
        {...recipe}
        deleteRecipeCallback={() => this.props.deleteRecipeCallback(recipe)}
        recipeDetailCallback={() => this.props.recipeDetailCallback(recipe)}
        />);
      });

      return(
        <div className="recipe-container">
        {RecipeList}
        </div>
      )
    }


  }

  // Myrecipes.propTypes = {
  //   myrecipes: PropTypes.array,
  //
  // };

  export default Myrecipes;
