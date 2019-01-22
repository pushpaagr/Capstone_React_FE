import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';



  class Details extends Component {


    render() {
      console.log(this.props.detailRecipe);
      if (this.props.detailRecipe) {
        const ingredients = this.props.detailRecipe.ingredients.map((item, i) => {
          return (
            item.text
          )
        })


        const healthLabels = this.props.detailRecipe.healthLabels.map((item, i) => {
          return (
            item
          )
        })

        return (
          <div>
            <Card>
              <CardImg top width="50%" src={this.props.detailRecipe.image} />
              <CardBody>
                <CardTitle>{this.props.detailRecipe.label}</CardTitle>
                <CardSubtitle>Ingredients:</CardSubtitle>
                <CardText>{ingredients ? ingredients : "None"}</CardText>
                <CardSubtitle>HealthLabel:</CardSubtitle>
                <CardText>{healthLabels}</CardText>
                {((this.props.user && this.props.myaccountrecipedetail) || !(this.props.user)) ? null: <Button onClick={() => this.props.addRecipeActionCallback(this.props.detailRecipe)
                }className="item__button"
                >Add Recipe</Button> }
                <CardSubtitle>URL:{this.props.detailRecipe.url}
                </CardSubtitle>

              </CardBody>
            </Card>
          </div>
        )
      } else {
        return <div></div>;
        }
      }
    }

    export default Details;
