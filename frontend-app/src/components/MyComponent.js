import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import LineChart from 'chart.js'
 import Puff from '../assets/Jigglypuff.png'

class MyComponents extends Component {
    constructor() {
        super();
        this.state = {
          width:  800, //800
          height: 182   //182
        }
      }
      updateDimensions() {
        if(window.innerWidth < 500) {
          this.setState({ width: 450, height: 102 });
        } else {
          let update_width  = window.innerWidth-100;
          let update_height = Math.round(update_width/4.4);
          this.setState({ width: update_width, height: update_height });
        }
      }
    
      /**
       * Add event listener
       */
      componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
      }
    
      /**
       * Remove event listener
       */
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
      }
      render() {
        return(
          <div > 
             <img src={Puff} alt = "puff" width={this.state.width} height={this.state.height} /> 
          </div>
        );
      }
}

export default MyComponents;
// import React, {Component} from 'react';
// import AutoScale from 'react-auto-scale';

//  class MyComponent extends Component {
//   render() {
//     return (
//       <div className="myContainer">
//         <AutoScale>
//           <div className="myContent">
//             console.log("got to the puff pic");
            
//               <img src = {Puff} alt = "puff pic"></img>

//           </div>
//         </AutoScale>
//       </div>
//     );
//   }
// }

// export default MyComponent;