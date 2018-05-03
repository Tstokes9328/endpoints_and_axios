import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import UsersList from './components/Users/UsersList';
import CardsList from './components/Cards/CardsList';
class App extends Component {
  constructor() {
    super();
    this.state = {
      test: 'Nothing yet',
      clicked: 'This button has not been clicked yet',
      input: '',
      users: [],
      cards: [],
      id: null,
      name: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateId = this.updateId.bind(this)
    this.updateName = this.updateName.bind(this)
  }
  componentDidMount() {
    /* Example axios request:
  GET: axios.get('/api/test')
        .then(({ data }) => this.setState({ test: data }))
        .catch((err) => console.log('could not get test', err));
  PUT: axios.get(`/api/test/${id}`)
        .then(({ data }) => this.setState({ test: data }))
        .catch((err) => console.log('could not get test', err));
        */
    // Step 1-front end request
    // create an axios request and hit the test endpoint when the page loads
    // set the response to the 'test' property on state
     axios.get('/api/test')
      .then((response) => {
        this.setState({test: response.data})
      })



    // Step 2-front end request
    // hit the get cards endpoint so that our cards show up
    // set the response to the 'cards' property on state
   axios.get('/api/cards').then((response) => {
    this.setState({cards: response.data})
   })


    // Step 3-front end request
    // hit the get endpoint that will send us the users.
    // set the response to the 'users' property on state
   axios.get('/api/users').then((response) => {
    this.setState({users: response.data})
   })



    // ------------------ end of componentDidMount --------------------
  } // this bracket closes the componentDidMount method. Don't delete it

  // Step 4-front end request
  //inside the handleClick method, hit the get endpoint that will return the string 'This button has been clicked'
  // set the response to update the 'clicked' property on state
  handleClick() {
    console.log('clicked the button!');
      axios.get('/api/string')
        .then((response) => {
          this.setState({clicked: response.data})
        })

  }


  // Step 5-front end request
  // inside the handleChange method
  // hit the post endpoint that will accept your string and send it back
  // whenever someone types into the input box
  // set the response to update the 'input' property on state
  handleChange(e) {
    let words = e.target.value;
    console.log('you changed something!');
      axios.post(`/api/post`, {words})
        .then((response) => {
          this.setState({input: response.data})
        })
  }


  // Step 6-front end request
  // PUT
  //create a function to hit an endpoint whenever someone types into the update endpoint
  // set the response to update the update prop on state
  handleUpdate() {
    console.log('handling the update');
    let { id, name } = this.state;
   // leave the stuff above this line
   // write code here:
    axios.put(`/api/users/${id}`, {name})
      .then((response) => {
        this.setState({users: response.data})
      }).catch((error) => console.log('error!'))
  }


  // Step 7-front end request
  // DELETE
  // create an input to handle clicking on a card to remove it
  // update the cards array with the response from state
  handleDelete(index) {

    console.log('handling the delete');
    axios.delete(`/api/users/${index}`)
      .then((response) => {
        this.setState({cards: response.data})
      })
  }

  ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  // DO NOT CHANGE ANY CODE BELOW THIS LINE!!!!!
  ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
  // everything below this line is set up to work if you are updating 
  // state properly. Feel free to look around at what is happening here, 
  // but only change things at your own risk

  updateId(e) {
    this.setState({
      id: e.target.value
    })
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {

    let users = this.state.users.map((user, i) => {
      return <div className="single-user_wrapper" key={'user' + i}>
        <div className="user_id">User Id: {user._id}</div>
        <div className="user_name">Name: {user.name}</div>
      </div>
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Endpoints and Axios!</h1>
        </header>
        <section className="body-wrapper">
          {/* Top left in grid */}
          <section>
            <div className="response">
              <h3 className="response_text">Test endpoint: {this.state.test}</h3>
            </div>
          </section>
          {/* Top Right in grid */}
          <section>
            <div className="button-container">
              <button className="button" onClick={this.handleClick}>Click Me</button>
              <div className="button-text">{this.state.clicked}</div>
            </div>
          </section>
          {/* Middle Left */}
          <section className="postInput-wrapper" >
            <div className="postInput">
              <label className="postInput-label">You can type stuff here: </label>
              <input className="input postInput-input" id="postInput" type="text" onChange={this.handleChange} />
            </div>
            <div className="postInput-text">
              And see it here: <span className="postInput-text_response">{this.state.input}</span>
            </div>
          </section>
          {/* Middle Right */}
          <section>

          </section>

          <section className="update-wrapper">
            <div className="users_update">
              <input className="users_update-id" type="number" onChange={this.updateId} />
              <input className="users_update-name" type="text" onChange={this.updateName} />
              <button onClick={this.handleUpdate}>Update</button>
            </div>
            <div className="users_wrapper">
              {users}
            </div>

          </section>
          {/* Bottom Left */}
          <CardsList cardsList={this.state.cards}
            handleDelete={this.handleDelete} />

        </section>

      </div>
    );
  }
}

export default App;
