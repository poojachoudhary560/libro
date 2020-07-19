import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import Moment from 'react-moment';
class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    lyricsArr: []
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        let lyricsArr = res.data.message.body.lyrics.lyrics_body.split(',');
        //console.log(res.data);
        this.setState({
          lyrics: res.data.message.body.lyrics,
          lyricsArr: lyricsArr
        });
        //console.log(this.props.match.params.id);
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        //console.log(res.data);
        this.setState({
          track: res.data.message.body.track
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    console.log(lyrics);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <div className='container'>
            <div className='row' style={{marginBottom: '0'}}>
              <div className='col s6'>
                <Link
                  to='/'
                  className='btn-floating btn-large waves-effect waves-light white'
                  style={{ margin: '1rem 0', border: '1px solid teal' }}
                >
                  <i className='material-icons teal-text'>arrow_back</i>
                </Link>
              </div>
              <div className='col s6 '>
                <nav
                  className='teal-text white z-depth-0'
                  style={{ marginTop: '0.5rem' }}
                >
                  <div class='nav-wrapper teal-text'>
                    <div class='col s12' style={{display: 'flex', justifyContent: 'flex-end'}}>
                      <Link
                        to='/'
                        className='teal-text breadcrumb'

                      >
                        Home
                      </Link>
                      <a href='#'
                        className='teal-text breadcrumb '
                        style={{cursor: 'default'}}
                      >
                        {track.track_name}
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <div className='card' style={{marginTop: '0'}}>
              <div className='card-content center'>
                <p>Lyrics</p>
                <span
                  className='card-title teal-text text-darken-2'
                  style={{ fontWeight: '380' }}
                >
                  "{track.track_name}"{' '}
                </span>
                <span className='right-align teal-text text-lighten-1'>
                  - by{' '}
                  <span
                    className='text-secondary'
                    style={{ fontStyle: 'italic' }}
                  >
                    {track.artist_name}
                  </span>
                </span>
              </div>

              <div className='card-content center'>
                <div
                  className='row'
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <div className='col'>
                    <strong>Album ID</strong>: {track.album_id}
                  </div>
                  <div className='col'>
                    <strong>Genre</strong>:{' '}
                    {track.primary_genres.music_genre_list[0] > 0
                      ? track.primary_genres.music_genre_list[0].music_genre
                          .music_genre_name
                      : 'Not available'}
                  </div>
                  <div className='col'>
                    <strong>Explicit Words</strong>:{' '}
                    {track.explicit === 0 ? 'No' : 'Yes'}
                  </div>
                  <div className='col'>
                    <strong>Last Updated</strong>:{' '}
                    <Moment format='MM/DD/YYYY'>{track.updated_time}</Moment>
                  </div>
                </div>

                {this.state.lyricsArr.map((line) => {
                  return <p>{line}</p>;
                })}
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Lyrics;
