import React, { Component } from 'react';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';
  import "./Myrecipe.css";

  class Myrecipe extends Component {


    render() {
      return (
        <div className="single-recipe">
          <div>
            <Card>
              <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.label}</CardTitle>

                <Button  onClick={() => this.props.recipeDetailCallback()}
                  className="item__button">Recipe Details </Button>

                <Button onClick={() => this.props.deleteRecipeCallback()
                  }className="item__button"
                  >Delete Recipe</Button>

              </CardBody>
            </Card>
          </div>
        </div>
      )
    }

  }

  export default Myrecipe;
