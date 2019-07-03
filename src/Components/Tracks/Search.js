import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
class Search extends Component{
  state={
    trackTitle: ''
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q=${this.state.trackTitle}&page=1&page_size=10&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
        this.setState({
          trackTitle: ''
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          console.log(value);
          return (
            <div className="card">
              <h1>
                <i className="material-icons">search</i>
                Search for a Song
              </h1>
              <p> Get the Lyrics for your favorite song </p>
              <form onSubmit={this.findTrack.bind(this,dispatch)}>
                <input
                type="text"
                placeholder="Song Title ..."
                name="trackTitle"
                value={this.state.trackTitle}
                onChange={this.onChange}
                />
                <button className="btn" type="submit">
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
