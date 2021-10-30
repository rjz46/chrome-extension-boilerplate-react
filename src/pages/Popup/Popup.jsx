import React from 'react';
import convomed_logo from '../../assets/img/convomed_logo_ver2.png';
import reddit_logo from '../../assets/img/reddit_logo.png';

import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { Container, Grid, Image, Radio, Icon, Divider, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Popup = () => {
  return (
    <div className="App">
      <Container>
        <Grid>
          <Grid.Row fitted>
            <Grid.Column width={8}>
              <img src={convomed_logo} className="app-logo" alt="convomed_logo" />
            </Grid.Column>
            <Grid.Column width={8}>
              <img src={reddit_logo} className="app-logo" alt="reddit_logo" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="app-tag">
            <Grid.Column>
              <Label tag> An AI-powered <span className="bt">Conv</span>ersati<span className="bt">o</span>n <span className="gt">Med</span>iator for <span className="ot">Reddit</span> Discussions</Label>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Icon name='area chart' />
              <span className="bt">Dis</span><span className="gt">Vis</span>
            </Grid.Column>
            <Grid.Column width={8}>
              <div> AI-powered Discussion Visualizer </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Radio toggle/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Icon name='sort amount down' />
              <span className="bt">Auto</span><span className="gt">Tune</span>
            </Grid.Column>
            <Grid.Column width={8}>
              <div> Comment Ranking, Sorting, and Filtering with AI algorithms</div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Radio toggle/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Icon name='edit outline' />
              <span className="bt">Auto</span><span className="gt">Tone</span>
            </Grid.Column>
            <Grid.Column width={8}>
              <div> Rewriting with AI suggestions </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Radio toggle/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Icon name='users' />
              <span className="bt">Co</span><span className="gt">Cast</span>
            </Grid.Column>
            <Grid.Column width={8}>
              <div> Rewriting with AI and Crowd suggestions </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Radio toggle/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Icon name='conversation' />
              <span className="bt">Fore</span><span className="gt">Cast</span>
            </Grid.Column>
            <Grid.Column width={8}>
              <div> Predicting Conversational Outcome </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Radio toggle/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Icon name='user md' />
              Profile
            </Grid.Column>
            <Grid.Column width={8}>
            <Icon name='settings' />
              Settings
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    </div>
  );
};

export default Popup;
