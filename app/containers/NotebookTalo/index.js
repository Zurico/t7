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
import EditorTalo from 'components/EditorTalo';

class NotebookJS extends React.Component {

  shouldComponentUpdate(){
    return false;
  }

  render() {

  const taloDefaultDocument = [{element:'text'}];

    return (
      <div>
        <Helmet
          title="Talo Notebook Page"
          meta={[
            { name: 'description', content: 'Talo Notebook Page' },
          ]}
        />
        <EditorTalo
          className="talo-editor"
          codeText={Resources.getNotebookContent(this.props.valo, this.props.meta) || taloDefaultDocument}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  valo: selectValo()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(NotebookJS);
