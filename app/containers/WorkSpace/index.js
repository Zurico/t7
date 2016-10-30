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
    if(!pageNumber || !this.props.workspace.pages[pageNumber]) return;
    this.props.addToWorkSpace(this.props.workspace.pages[pageNumber]);
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
        <div className={styles.tabs_list_container}>
          <ul className={styles.tabs_list} onClick={this.openTab.bind(this)}>
          {
            this.props.workspace.pages.map((page, num) => (
              <li key={num} rel={num} className={`${styles.tab_item} ${this.props.workspace.actived === num ? styles.actived : ''}`}>
                <div className={styles.tab_title}>{page.title || `Tab ${num+1}`}</div>
                <div className={styles.tab_close}></div>
              </li>
            ))
          }
          </ul>
        </div>
        {
          this.props.workspace.pages.map((page, num) => (
            <div key={num} className={`${styles.tabs_views} ${this.props.workspace.actived === num ? '' : styles.tab_hidden}`}>
              <div className={styles.tabs_view}>
                {Register.getComponent(page)}
              </div>
            </div>
          ))
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
  addToWorkSpace: resource => dispatch(addToWorkSpace(resource))
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(mouseTrap(WorkSpace));
