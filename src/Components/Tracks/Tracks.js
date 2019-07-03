import React, { Component, Fragment } from 'react';
import { Consumer } from '../../context';
import Spinner from '../Layout/Spinner';
import Track from '../Tracks/Track';
import '../../App.css';
class Tracks extends Component{
  render(){
     return(
       <Consumer>
        {
          value => {
            const { track_list, heading } = value;
            console.log(value);
            if(track_list === undefined || track_list.length === 0){
              return <Spinner />
            } else{
              return (
                <Fragment>
                  <h3 className="center" >{ heading }</h3>
                  <div className="container">
                    <div className="section">
                      <div className="row">
                        {track_list.map(item => (
                          <Track
                            key={item.track.track_id}
                            track={item.track}
                          />
                        ) )}
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            }
          }
        }
       </Consumer>
     );
  }

}

export default Tracks;
