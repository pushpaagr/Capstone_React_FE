import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';
  import Calendar from 'react-calendar';
  import { Link } from "react-router-dom";


  class Recipe extends Component {

    state = {
      date: new Date(),
      calendarvisible: false,
    }

    onChange = date => {
      const newdate = new Date(date);
      const year=newdate.getFullYear();
      const month=newdate.getMonth()+1
      const day=newdate.getDate();
      const formatted=year+"-"+month+"-"+day;


      this.setState({
        date: formatted,
        calendarvisible: false
      })
      this.props.addRecipeActionCallback(formatted);

    }

    toggleCalendar = () => {
      this.setState({
        calendarvisible: !(this.state.calendarvisible),
      })
    }

    renderAddButton() {
      if (!this.props.user) return null

      return (
        <div>
          <Button onClick={this.toggleCalendar}
            className="item__button"
            >
            Add
          </Button>

          {this.state.calendarvisible && <Calendar
            onChange={this.onChange}
            value={this.state.date}
            />}

          </div>
        )
      }

      render () {
        return(
          <div className="single-recipe">
            <Card className="Card-Card">
              <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.label}</CardTitle>

                {this.renderAddButton()}

                <Button
                  onClick={() => this.props.recipeDetailCallback()}
                  className="item__button"
                  ><Link to="/details/">Recipe Details</Link>
              </Button>
            </CardBody>
          </Card>
        </div>
      )
    }

  }
  Recipe.propTypes = {
    label: PropTypes.string

  };


  export default Recipe;
