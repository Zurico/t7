/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';

// https://github.com/primer/octicons/tree/v2.1.2
import Octicon from 'react-octicon'

export class WorkSpacePage extends React.Component {

  render() {

    return (
      <article>
        <Helmet
          title="Workspace Page"
          meta={[
            { name: 'description', content: 'Talo Workspace Page' },
          ]}
        />
        <p>
          Hello World <Octicon name="sync"/>
        </p>
      </article>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default WorkSpacePage;
