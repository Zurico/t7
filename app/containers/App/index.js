/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

/* System imports */
import React from 'react';
import Helmet from 'react-helmet';

/* CSS imports */
import 'sanitize.css/sanitize.css'; // Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import styles from './styles.css';

/* Components imports */
import ResourcesTree from 'components/ResourcesTree';
import Tabs from 'components/Tabs';
import Footer from 'components/Footer';
import HelperTour from 'components/HelperTour';
import FuzzyFinder from 'components/FuzzyFinder';

function App(props) {
  return (
    <section className={styles.main}>
      <Helmet
        titleTemplate="%s - Talo"
        defaultTitle="Talo"
        meta={[
          { name: 'description', content: 'a Valo based UI application for devs and devops' },
        ]}
      />
        <article className={styles.workspace}>
          <ResourcesTree />
          {React.Children.toArray(props.children)}
          {/*<Tabs>{React.Children.toArray(props.children)}</ Tabs>*/}
        </article>
        <Footer />
        <FuzzyFinder />
        <HelperTour />
    </section>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
