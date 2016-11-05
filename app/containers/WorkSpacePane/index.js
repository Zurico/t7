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
import { addToWorkSpace } from 'components/ResourcesTree/actions';
import { activePane } from './actions';
// https://github.com/primer/octicons/tree/v2.1.2
import Octicon from 'react-octicon';
import * as Register from 'utils/register';

class WorkSpace extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  openTab(event){
    let target = event.target;
    while(target && target.tagName.toLowerCase() != 'li') target = target.parentElement;
    if(!target) return;
    const pageNumber = target.getAttribute('rel');
    if(!pageNumber || !this.props.pane.pages[pageNumber]) return;
    this.activePane();
    this.props.addToWorkSpace(this.props.pane.pages[pageNumber]);
  }

  activePane(){
    this.props.activePane(this.props.id);
  }

  calculateWidth(){
    const treeViewWidth = (window.innerWidth - 200) / (this.props.workspace.panes.length || 1);
  }

  render(){

    const treeViewWidth = (window.innerWidth - 200) / (this.props.workspace.panes.length || 1);
    const dinamicWidth = {'width':`${treeViewWidth}px`};

    return (
      <div className={styles.container} onClick={this.activePane.bind(this)} style={dinamicWidth}>
        <ul className={styles.tabs_list} onClick={this.openTab.bind(this)}>
        {
          this.props.pane.pages.map((page, num) => (
            <li key={num} rel={num} className={`${styles.tab_item} ${this.props.pane.actived === num ? styles.actived : ''}`}>
              <div className={styles.tab_title}>{page.title || `Tab ${num+1}`}</div>
              <div className={styles.tab_close}></div>
            </li>
          ))
        }
        </ul>
        {
          this.props.pane.pages.map((page, num) => (
            <div key={num} className={`${styles.tabs_views} ${this.props.pane.actived === num ? '' : styles.tab_hidden}`}>
              <div className={styles.tabs_view}>
                {Register.getComponent(page)}
              </div>
            </div>
          ))
        }
        <div className={styles.tree_view_resizer}></div>
      </div>
    );

  }
}

WorkSpace.propTypes = {
  workspace: React.PropTypes.object,
  pane: React.PropTypes.object,
  id: React.PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  workspace: selectWorkSpace()
});

const mapDispatchToProps = dispatch => ({
  addToWorkSpace: resource => dispatch(addToWorkSpace(resource)),
  activePane: paneID => dispatch(activePane(paneID))
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(mouseTrap(WorkSpace));
