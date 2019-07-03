import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import Moment from 'react-moment';
class Lyrics extends Component{
  state={
    track:{},
    lyrics:{}
  }

  componentDidMount(){
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        //console.log(res.data);
        this.setState({
          lyrics: res.data.message.body.lyrics
        });
        //console.log(this.props.match.params.id);
        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`);

      })
      .then(res => {
        //console.log(res.data);
        this.setState({
          track: res.data.message.body.track
        })
      })
      .catch(err => console.log(err));
  }

  render(){
    const { track, lyrics } = this.state;
    console.log(track);
    console.log(lyrics);
    if(track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0){
        return <Spinner />
    }else {
      return (
        <Fragment>
          <Link to="/" className="btn">Go back</Link>
          <div className="card">
            <div className="card-content">
              <span className="card-title">
                {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
              </span>
              <p className="">
                {lyrics.lyrics_body}
              </p>
            </div>
          </div>
          <ul>
            <li>
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li>
              <strong>Genre</strong>: { track.primary_genres.music_genre_list[0] > 0 ?
                                        track.primary_genres.music_genre_list[0].music_genre.music_genre_name :
                                        "Not available"

                                        }
            </li>
            <li>
              <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li>
              <strong>Last Updated</strong>: <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
            </li>
          </ul>
        </Fragment>
      )
    }
  }
}

export default Lyrics;
