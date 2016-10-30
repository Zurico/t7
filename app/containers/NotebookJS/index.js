/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { connect } from 'react-redux';
import { mouseTrap } from 'react-mousetrap';
import { createStructuredSelector } from 'reselect';
import { selectValo } from 'components/ResourcesTree/selectors';
import * as Resources from 'utils/resources';
// https://github.com/primer/octicons/tree/v2.1.2
import Octicon from 'react-octicon';
import Editor from 'components/Editor';

class NotebookJS extends React.Component {

  shouldComponentUpdate(){
    return false;
  }

  render() {

    const notebookExampleCode =
`/**
* "
*  This is a sample JavaScript Notebook
*  Further details at https://github.com/ITRS-Group/valo-sdk-js
*
*  Consider reading also valo docs https://valo.io/docs/
*  Press Ctrl + Enter to run the notebook
* "
*/

// Remember to clean up your stuff, please!
window.addEventListener("beforeunload", event => myQuery.destroy())

// Alias to Query Factory
const QueryFactory = jsdt.networking.services.Query

// Set up a query (this creates the query but do not start it)
const myQuery = await QueryFactory('from /streams/demo/cpu/infrastructure')

// Print the query schema
console.log(myQuery.schema())

// Subscribe (aka start query) and print data coming in
myQuery.subscribe(payload => console.log(payload))
`;

  const simpleNotebookExampleCode =
`/**
* "
*  This is a sample JavaScript Notebook
*  Further details at https://github.com/ITRS-Group/valo-sdk-js
*
*  Consider reading also valo docs https://valo.io/docs/
*  Press Ctrl + Enter to run the notebook
* "
*/
const stream = '/streams/demo/infrastructure/cpu';
const user = 49;

render(\`from \${stream} where user < \${user}\`);
`;

    return (
      <div>
        <Helmet
          title="JS Notebook Page"
          meta={[
            { name: 'description', content: 'Talo JavaScript Notebook Page' },
          ]}
        />
        <Editor
          className="code-editor"
          codeText={Resources.getNotebookContent(this.props.valo, this.props.meta) || simpleNotebookExampleCode}
          theme={"solarized"}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  valo: selectValo()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(mouseTrap(NotebookJS));
