/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
// https://github.com/primer/octicons/tree/v2.1.2
import Octicon from 'react-octicon';
import Logo from 'components/Logo';
import styles from './styles.css';
import messages from './messages';
import {platformKeySymbols} from 'utils/helper';

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
        <div className={styles.messages_container} style={({display:'none'})}>
          <div className={styles.messages_centered}>
            <Logo />
            <ul className={styles.messages_list}>
              <li className={styles.message}>
                <FormattedMessage {...messages.availableOptions} />
                {/*<span className={styles.keystroke}>⌘H</span>*/}
                <span className={styles.keystroke}>{platformKeySymbols(0)}C</span>
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
