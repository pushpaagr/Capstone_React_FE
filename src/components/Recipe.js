import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import axios from 'axios';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';
  import Calendar from 'react-calendar';

// onClick={this.props.addRecipeActionCallback}

  class Recipe extends Component {

    state = {
      date: new Date(),
      calendarvisible: false,
    }

    onChange = date => {
      this.setState({
          date,
          calendarvisible: false
        })
      console.log(date);

      this.props.addRecipeActionCallback()

      // do something with google calendar + date
    }

    toggleCalendar = () => {
      // console.log("in toggle");
      this.setState({
        calendarvisible: !(this.state.calendarvisible),
      })
    }

    renderAddButton() {
      // console.log(this.state.calendarvisible);
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
      const BASE_URL = "https://www.google.com/calendar/render?action=TEMPLATE&text=Your+Event+Name&dates=20140127T224000Z/20140320T221500Z&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml "
      return(
        <div className="single-recipe">
          <Card>
            <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
            <CardBody>
              <CardTitle>{this.props.label}</CardTitle>

              {this.renderAddButton()}

              <Button
                onClick={() => this.props.recipeDetailCallback()}
                className="item__button"
              >
                Recipe Details
              </Button>

              <a href={BASE_URL}> click me </a>


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
