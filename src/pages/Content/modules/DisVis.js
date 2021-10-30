import React from 'react';

//import $ from './DisVis/libs/jquery-1.10.1.min';
import './DisVis/libs/d3.min';
//import './DisVis/css/foundation.min.css';
import './DisVis/css/style.css';
//import './DisVis/css/general_enclosed_foundicons.css';

//import './DisVis/libs/custom.modernizr.js';
//import './DisVis/libs/foundation.min.js';
//import './DisVis/libs/jquery.embedly-3.1.1.min.js';
//import './DisVis/config.js';
//import * as crawl from './DisVis/js/crawl.js';
import * as vis from './DisVis/js/vis.js';


export class DisVis extends React.Component {

  componentDidMount() {
    //crawl.getFrontPage();
    //var discussion = location.search.substring(12);
    //buildNetwork(discussion);
    //modernizr
    //create_scoreboard();

    //vis.buildNetwork_extension("https://www.reddit.com/r/PoliticalHumor/comments/q2adqr/and_hopefully_they_dont_impregnate_anyone_either/");
    //const path = "chrome-extension://"+chrome.runtime.id+"/DisVis/";
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        // listen for messages sent from background.js
        if (request.message === 'hello!') {
          console.log(request.url) // new url is now in content scripts!
          //vis.buildNetwork_extension("https://www.reddit.com/r/PoliticalHumor/comments/q2adqr/and_hopefully_they_dont_impregnate_anyone_either/");
          if(request.url.includes("/comments/")){
            vis.buildNetwork_extension(request.url);
          }
        }
    });
  }

  render() {

    return (
      <div className="sub_container">
          <div id="chart"></div>
      </div>

    );

  }
}
