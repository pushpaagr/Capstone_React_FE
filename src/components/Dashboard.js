import React, { Component } from 'react';
import { auth, provider } from '../firebase.js';
import axios from 'axios';
import Carousel from './Carousel';
import Recipes from './Recipes';
import Myrecipes from './Myrecipes';
import Details from './Details';
import './Dashboard.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Navbar, Button, FormGroup, Alert, FormControl, } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Dashboard extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      message: "",
      result: [],
      query: "",
      user: null,
      detailRecipe: "",
      seedetail: false,
      searchrecipe: false,
      myrecipe: false,
      showhome: false,
      indatabase: false,
      myaccountrecipedetail: false,
      accesstoken: "",
      calendardate: "",
      calendarDate: "",
    }
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      query: '',
      result: [],
      searchrecipe: true,
      myaccountrecipedetail: false,
    });
    this.searchRecipes();
  }
  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({message: `Welcome Back ${this.state.user.displayName}`})
      }
    });
  }

  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('result', result);
      console.log('user', user);
      this.setState({
        user: user,
        result: [],
        query: "",
        detailRecipe: "",
        seedetail: false,
        searchrecipe: false,
        myrecipe: false,
        showhome: true,
        indatabase: false,
        myaccountrecipedetail: false,
        accesstoken: result.credential.accessToken,
      });
      console.log(this.state.accesstoken);
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        myaccountrecipedetail: false,
        message: "",
        result: [],
        query: "",
        detailRecipe: "",
        seedetail: false,
        searchrecipe: false,
        myrecipe: false,
        showhome: true,
        indatabase: false,
      });
    });
  }

  searchRecipes = () => {
    const searchterm = this.state.query
    const url = `http://localhost:8080/search?ingredients=${this.state.query}`

    this.setState({
      result: [],
      showhome: false,
      query: "",
      detailRecipe: "",
      seedetail: false,
      myrecipe: false,
    });


    axios.get(url)
    .then((response) => {
      this.setState({
        result: response.data.hits,
        message: `Loading search for ${searchterm}`,
        searchrecipe: true,
      });
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    })

  };



  addRecipe = (formatedDate, recipe) => {

    console.log(this.state.user);
    let id = recipe.uri
    id = encodeURIComponent(id);
    let url = `http://localhost:8080/addrecipe?id=${id}&useruid=${this.state.user.uid}`

    axios.post(url)
    .then((response) => {
      this.setState({
        message: `Successfully added ${recipe.label}`,
        showhome: false,
        indatabase: true,
      })
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });

    // console.log(`formated date: ${formatedDate}`)
    // console.log(`access token: ${this.state.accesstoken}`);

    axios.request ({
      url: `https://www.googleapis.com/calendar/v3/calendars/${this.state.user.email}/events`,
      method: 'post',
      data: {
        "summary": `Recipe: ${recipe.label} ${recipe.uri}`,
        "end": {"date": `${formatedDate}`},
        "start": {"date": `${formatedDate}`}
      },
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', "Authorization" : `Bearer ${this.state.accesstoken}`},})

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("in error function of post request");
        console.log(error);
      });
    };




    deleteRecipe = (recipe) => {

      let url = `http://localhost:8080/recipe?documentid=${recipe.documentid}`

      axios.delete(url)
      .then((response) => {
        this.setState({
          message: `Successfully delted ${recipe.label}`,
          result: [],
        })
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });

    }

    myrecipes = () => {

      const url = `http://localhost:8080/myrecipes?useruid=${this.state.user.uid}`
      axios.get(url)
      .then((response) => {
        this.setState({
          result: response.data,
          myrecipe: true,
          seedetail: false,
          searchrecipe: false,
          showhome: false,
          myaccountrecipedetail: true,
        })
      })
      .catch((error) => {
        this.setState({
          error
        });
      })
    }

    recipeDetail = (recipe) => {
      this.setState({
        detailRecipe: recipe,
        seedetail: true,
        result: [],
        showhome: false,
        myrecipe: false,

      })
    }

    showhome = () => {
      this.setState({
        showhome: true,
        message: "",
        result: [],
        query: "",
        detailRecipe: "",
        seedetail: false,
        searchrecipe: false,
        myrecipe: false,
      })
    }

    render() {
      return(
        <Router>
          <div>
            <div className="div-outer-nav">
              <Navbar className="navbar-navbar">
                <Navbar.Collapse>

                  <div className="navbarheader-outsideofnavbarheader">
                    <Navbar.Header className="header">
                      <Navbar.Brand>
                        <a href="/">Meal Tracker</a>
                      {console.log(this.state.showhome)}
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Form pullLeft>
                      <FormGroup>
                        <FormControl type="text" value={this.state.query} onChange={this.handleChange} placeholder="Recipe Search" />
                      </FormGroup>{' '}
                      <Button onClick={this.onFormSubmit} type="submit">Submit</Button>
                    </Navbar.Form>

                    <div>
                      {this.state.user ?
                        <Button onClick={this.logout}>Log Out</Button>
                        :
                        <Button onClick={this.login}>Log In</Button>
                      }
                    </div>

                    <div>
                      {this.state.user ?
                        <Button onClick={this.myrecipes}><Link to="/myaccount/" className="dashboard-link">My Account
                        </Link></Button>
                        :
                        <p></p>
                      }
                    </div>

                    <div>
                      <Button onClick={this.showhome}><Link to="/">Home
                      </Link></Button>
                    </div>

                  </div>
                </Navbar.Collapse>

              </Navbar>

              <Alert  bsStyle="success">
                <p className={"status-bar__text"}>{this.state.message}</p>
              </Alert>

              {this.state.showhome ?   <Route path="/" exact component={Carousel} />: null}



              {this.state.searchrecipe ? <Recipes
                recipeList={this.state.result}
                useruid={this.state.user ? this.state.user.uid : null}
                recipeDetailCallback={(recipe) => this.recipeDetail(recipe)}
                user={this.state.user}
                addRecipeActionCallback={(formatedDate, recipe) => this.addRecipe(formatedDate, recipe)}

                /> : null}


                {this.state.myrecipe ?   <Route path="/myaccount/" render={() => <Myrecipes
                  myrecipes={this.state.result}
                  deleteRecipeCallback={(recipe) => this.deleteRecipe(recipe)}
                  recipeDetailCallback={(recipe) => this.recipeDetail(recipe)}
                  />} /> : null }

                  {this.state.seedetail ? <Details detailRecipe={this.state.detailRecipe}
                  user={this.state.user}
                  myrecipe={this.state.myrecipe}
                  indatabase={this.state.indatabase}
                  myaccountrecipedetail={this.state.myaccountrecipedetail}
                  addRecipeActionCallback={(recipe) => this.addRecipe(recipe)}
                  /> : null}
                </div>
              </div>
            </Router>
          )
        }


      }

      export default Dashboard;
