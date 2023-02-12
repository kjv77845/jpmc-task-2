import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, // app knows it should have data and graph properties 
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false, // set as false so that graph only shows up once user clicks the "Start Streaming Data" Button 
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {  // will only work once show Graph is True , Default is False, 
      return (<Graph data={this.state.data} />) // this line shows the graph 
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // my comments 
    // need to set a repetitive time to call for data 
    // save the time ID returned by the set interval function as a const, this will be used to stop calling for new data after a set amount of times 
    let iterations = 0;
    const time_interval_ID = setInterval(() => {
        DataStreamer.getData((serverResponds: ServerRespond[]) => { // array of ServerRespond objects 
        // Update the state by creating a new array of data that consists of Previous data in the state and the new data from server
          this.setState({
            data: serverResponds, // will update the data variable with the data recieved from the server 
            showGraph: true
        }); // after data is obtained, need to show the graph with the new data 
      }); // end of Data Streamer Function 
      iterations++;
      // Program will continue forever if no stopping condition is set 
      if (iterations > 5000) { // after 5 seconds, stop calling for new data, 
        clearInterval(time_interval_ID);
      }
      //going to use clearInterval to stop the loop from running - will create condition to stop it from running forever - 
      // going to read data every 500 seconds 
    }, 1000); // end of set Interval Function , gets data every 1 second 
  } // End of get Data From Server Funciton 

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => { this.getDataFromServer() }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

