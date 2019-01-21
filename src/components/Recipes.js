import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import PropTypes from 'prop-types';
import './Recipes.css'


class Recipes extends Component {

  render() {
    const RecipeList = this.props.recipeList.map((recipe, i) => {
      const detailrecipe = this.props.searchbool ?   recipe.recipe : recipe.recipe
      return (<Recipe
        key={i}
        useruid={this.props.useruid}
        recipeDetailCallback={() => this.props.recipeDetailCallback(detailrecipe)}
        {...detailrecipe}
        user={this.props.user}
        addRecipeActionCallback={(formatedDate) => this.props.addRecipeActionCallback(formatedDate, detailrecipe)}
        />);
      });

      return(

        <div className="recipe-container">
          {RecipeList}
        </div>
      )
    }
  }

  export default Recipes;
