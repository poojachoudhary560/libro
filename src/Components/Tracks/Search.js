import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
class Search extends Component {
  state = {
    trackTitle: ''
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q=${this.state.trackTitle}&page=1&page_size=10&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
        this.setState({
          trackTitle: ''
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          console.log(value);
          return (
            <div className='card' style={{margin: '0 auto', padding: '1rem 3rem'}}>
              <div className='card-content'>
                <span className='card-title'>
                  Get the Lyrics for your favorite song
                </span>
                <div class='row' style={{marginBottom: '0'}}>
                  <form
                    onSubmit={this.findTrack.bind(this, dispatch)}
                    class='col s12'
                  >
                    <div class='row' style={{marginBottom: '0'}}>
                      <div class='input-field col s6'>
                        <i className='material-icons prefix'>search</i>
                        <input
                          type='text'
                          placeholder='Enter Song Title here...'
                          name='trackTitle'
                          value={this.state.trackTitle}
                          onChange={this.onChange}
                        />
                      </div>
                      <div class='input-field col s6'>
                        <button className='btn' type='submit'>
                          Get Track Lyrics
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
