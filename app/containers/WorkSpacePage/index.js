/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles.css';

// https://github.com/primer/octicons/tree/v2.1.2
import Octicon from 'react-octicon';
import Logo from 'components/Logo';

export class WorkSpacePage extends React.Component {

  render() {

    return (
      <article className={styles.container}>
        <Helmet
          title="Workspace Page"
          meta={[
            { name: 'description', content: 'Talo Workspace Page' },
          ]}
        />
        <div className={styles.messages_container}>
          <div className={styles.messages_centered}>
            <Logo />
            <ul className={styles.messages_list}>
              <li className={styles.message}>
                You can focus the Tree View with
                <span className={styles.keystroke}>⇧⌘P</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default WorkSpacePage;
