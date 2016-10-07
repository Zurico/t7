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

function NotebookPage(props){

    return (
      <article className={styles.container}>
        <Helmet
          title="Notebook Page"
          meta={[
            { name: 'description', content: 'Talo Notebook Page' },
          ]}
        />
        <ul className={styles.tabs_list}>
          <li className={styles.tab_item}>
            <div className={styles.tab_title}>Tab 1</div>
            <div className={styles.tab_close}></div>
          </li>
          <li className={`${styles.tab_item} ${styles.actived}`}>
            <div className={styles.tab_title}>Tab 2</div>
            <div className={styles.tab_close}></div>
          </li>
        </ul>
        <div className={styles.tabs_views}>
          <div className={styles.tabs_view}>
            {React.Children.toArray(props.children)}
          </div>
        </div>
      </article>
    );
}

NotebookPage.propTypes = {
  children: React.PropTypes.node,
};

// Wrap the component to inject dispatch and state into it
export default NotebookPage;
