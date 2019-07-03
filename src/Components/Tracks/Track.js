import React from 'react';
import { Link } from 'react-router-dom';
const Track = (props) => {
  const {track} = props;
  return (
    <div className="col s12 m6">
      <div className="card">
        <div className="card-content">
          <span className="card-title truncate">
            {track.artist_name}
          </span>
          <p>
            <strong><i className="tiny material-icons">play_circle_filled</i> Track</strong>:{track.track_name}
            <br/>
            <strong><i className="tiny material-icons">video_library</i> Album</strong>:{track.album_name}
          </p>
          <Link to={`lyrics/track/${track.track_id}`} className="btn waves-effect waves-light btn-small btn-class">
            <i></i>View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Track;
