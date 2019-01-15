// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// // healthLabels: array, image, ingredients: array, label, uri, calories
//
// class Details extends Component {
//
//   render() {
//     console.log("in details component");
//     console.log(this.props.detailRecipe);
//
//     if (this.props.detailRecipe) {
//
//       const ingredients = this.props.detailRecipe.recipe.ingredients.map((item, i) => {
//         return (
//           item.text
//         )
//       })
//
//
//       const healthlabels = this.props.detailRecipe.recipe.healthLabels.map((item, i) => {
//         return (
//           item
//         )
//       })
//
//
//       const dietlabels = this.props.detailRecipe.recipe.dietLabels.map((item, i) => {
//         return (
//           item
//         )
//       })
//
//
//       console.log(this.props.detailRecipe.recipe);
//
//       return (
//         <div>
//         <ul>
//         <li>{this.props.detailRecipe.recipe.label}</li>
//         <li><img src={this.props.detailRecipe.recipe.image} alt=''/></li>
//         <li>Calories: {this.props.detailRecipe.recipe.calories}</li>
//         <li>UrL: {this.props.detailRecipe.recipe.uri}</li>
//         <li>Ingredients: {ingredients ? ingredients : "None"}</li>
//         <li>HealthLabels: {healthlabels ? healthlabels: "None"}</li>
//         <li>DietLabels: {dietlabels ? dietlabels: "None" }</li>
//         </ul>
//         </div>
//       )
//     } else {
//       return <div></div>;
//     }
//   }
// }
//
// export default Details;
