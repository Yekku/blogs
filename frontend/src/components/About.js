import React from 'react'
import { Grid } from 'semantic-ui-react'

const About = () => (
  <Grid reversed="mobile vertically">
    <Grid.Row>
      <Grid.Column width={16}>
        <div>
          <h2>About blog app</h2>
        </div>
      </Grid.Column>
      <Grid.Column width={16}>
        <div style={{ margin: 20 }}>
          <h3>What is a Blog?</h3>
          <h4>Definition of blog</h4>
          <p>
            A blog (shortening of “weblog”) is an online journal or
            informational website displaying information in the reverse
            chronological order, with latest posts appearing first. It is a
            platform where a writer or even a group of writers share their views
            on an individual subject.
          </p>
          <h4>Blog structure</h4>
          <p>
            The appearance of blogs changed over time, and nowadays blogs
            include different items. But, most blogs include some standard
            features and structure. Here are common features that a typical blog
            will include: Header with the menu or navigation bar Main content
            area with highlighted or latest blog posts Sidebar with social
            profiles, favorite content, or call-to-action Footer with relevant
            links like a disclaimer, privacy policy, contact page, etc.
          </p>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default About
