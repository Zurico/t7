/*
 * WorkSpacePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { selectWorkSpace } from './selectors';
import { connect } from 'react-redux';
import { mouseTrap } from 'react-mousetrap';
import { createStructuredSelector } from 'reselect';
import { splitPane } from './actions';
// https://github.com/primer/octicons/tree/v2.1.2
import Octicon from 'react-octicon';
import HotKeys from 'utils/hotkeys';
import WorkSpacePane from 'containers/WorkSpacePane';

class WorkSpace extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.SPLIT_WORKSPACE_VERTICALLY.keys, this.splitWorkSpaceVerticallyShortcut.bind(this));
  }

  splitWorkSpaceVerticallyShortcut(){
    this.splitWorkSpaceVertically();
    return HotKeys.ADD_NOTEBOOK.default;
  }

  splitWorkSpaceVertically(){
    this.props.splitPane();
  }

  render(){

    return (
      <article className={styles.container}>
        <Helmet
          title="Workspace Page"
          meta={[
            { name: 'description', content: 'Talo Workspace' },
          ]}
        />
        {
          this.props.workspace.panes.map((pane, num) => <WorkSpacePane key={num} id={num} pane={pane} />)
        }
      </article>
    );

  }
}

WorkSpace.propTypes = {
  workspace: React.PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  workspace: selectWorkSpace()
});

const mapDispatchToProps = dispatch => ({
  splitPane: () => dispatch(splitPane())
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(mouseTrap(WorkSpace));
