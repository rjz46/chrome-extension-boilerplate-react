import React from 'react';
import ReactDOM from 'react-dom';

import "./content.styles.css";

//Semantic-UI modules
import { Button, Tab, Popup, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

//ConvoMed Modules
import { DisVis } from './modules/DisVis';
import { DisStats } from './modules/DisStats';
import { AutoTune } from './modules/AutoTune';
import { AutoTone } from './modules/AutoTone';
import { CoCast } from './modules/CoCast';
import { ForeCast } from './modules/ForeCast';
//import * as vis from '.module/DisVis/js/vis.js';

const extension_url = "chrome-extension://ejpeiobcjmegdpgdlofeoglikejbploj/";

const panes = [
  { menuItem: {content: 'DisVis', icon: 'users'}, render: () => <Tab.Pane><DisVis /></Tab.Pane> },
  { menuItem: 'DisStats', render: () => <Tab.Pane><DisStats /></Tab.Pane> },
  { menuItem: 'AutoTune', render: () => <Tab.Pane><AutoTune /></Tab.Pane> },
  { menuItem: 'AutoTone', render: () => <Tab.Pane><AutoTone /></Tab.Pane> },
  { menuItem: 'CoCast', render: () => <Tab.Pane><CoCast /></Tab.Pane> },
  { menuItem: 'ForeCast', render: () => <Tab.Pane><ForeCast /></Tab.Pane> },
]

const TabExampleBasic = () => <Tab panes={panes} />

const ConvoMed = () => (
  <div>
    <Popup
      open
      content={<TabExampleBasic />}
      on='click'
      position='top right'
      positionFixed
      trigger={<Button circular color="black" id='convomed_button' />}
    />
  </div>
)

const html = document.getElementsByTagName("html");
const convomed_container = document.createElement("convomed_container");
convomed_container.id = "convomed_container";
html[0]?.append(convomed_container);


ReactDOM.render(<ConvoMed />, document.getElementById('convomed_container'));
