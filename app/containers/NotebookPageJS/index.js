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
import Editor from 'components/Editor';

class NotebookPageJS extends React.Component {

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
          codeText={notebookExampleCode}
          theme={"solarized"}
        />
      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default NotebookPageJS;
