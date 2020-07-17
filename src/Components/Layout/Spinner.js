import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return(
    <div className="center" style={{minHeight: '400px',
    display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>

      <div class='preloader-wrapper big active'>
        <div class='spinner-layer spinner-teal-only'>
          <div class='circle-clipper left'>
            <div class='circle'></div>
          </div>
          <div class='gap-patch'>
            <div class='circle'></div>
          </div>
          <div class='circle-clipper right'>
            <div class='circle'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
