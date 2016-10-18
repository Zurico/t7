import React from 'react';
import styles from './styles.css';
import messages from './messages';
import { connect } from 'react-redux';
import { mouseTrap } from 'react-mousetrap';
import { createStructuredSelector } from 'reselect';
import { selectValo, selectResource } from './selectors';
import {changeResourceSelected, addTreeResource} from './actions';
import HotKeys from 'utils/hotkeys';
import PubSub from 'utils/pubsub';

class ResourcesTree extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.ADD_NOTEBOOK.keys, this.addNotebookShortcut.bind(this));
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.FUZZY_FINDER_NOTEBOOK_ITEM_ADDED, this.addNotebookAction.bind(this));
  }

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  componentDidMount(){
    // Use state.notebookSelected instead of props.notebookSelected for keeping state locally (no notebook selected on application startup)
    // notebook will be selected only on click
  }

  addNotebookFuzzyFinder(){
    // Request the fuzzy finder
    PubSub.publish(PubSub.topics.FUZZY_FINDER_REQUIRED, {
      enableCustomSelection: true,
      filter: this.props.resourceSelected,
      noMatchesText : messages.addNotebook,
      topic: PubSub.topics.FUZZY_FINDER_NOTEBOOK_ITEM_ADDED
    });
  }

  addNotebookShortcut(){
    this.addNotebookFuzzyFinder();
    // Prevent default
    return HotKeys.ADD_NOTEBOOK.default;
  }

  addNotebookAction(topic, resource){
    this.props.addTreeResource(resource);
  }

  select(event){
    let target = event.target;
    while(target && target.tagName.toLowerCase() != 'li') target = target.parentElement;
    if(!target) return;
    this.props.changeResourceSelected(target.getAttribute('rel'));
  }

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.tree_view_scroller} onClick={this.select.bind(this)}>
        { Object.keys(this.props.valo).map(hostname =>
            (<div className={styles.tree_wrapper} key={hostname}>
                <ol className={styles.tree_list} tabIndex="-1">
                  <li rel={hostname} className={`${styles.tree_list_item} ${this.props.resourceSelected === hostname ? styles.selected : ''}`}>
                     <div className={styles.tree_list_item_header}>
                       <span className={styles.tree_list_item_entries_repo}>
                         {hostname}
                       </span>
                     </div>
                     { Object.keys(this.props.valo[hostname]).map(tenant =>
                       (<ol className={styles.tree_list_item_entries} key={`${hostname}/${tenant}`}>
                         <li rel={`${hostname}/${tenant}`}
                             className={`${this.props.resourceSelected === (hostname+'/'+tenant) ? styles.selected : ''}`}>
                           <div className={styles.tree_list_item_header}>
                             <span className={styles.tree_list_item_entries_tenant}>{tenant}</span>
                           </div>
                           { Object.keys(this.props.valo[hostname][tenant]).map(collection =>
                             (<ol className={styles.tree_list_item_entries} key={`${hostname}/${tenant}/${collection}`}>
                                <li rel={`${hostname}/${tenant}/${collection}`}
                                    className={`${this.props.resourceSelected === (hostname+'/'+tenant+'/'+collection) ? styles.selected : ''}`}>
                                   <div className={styles.tree_list_item_header}>
                                     <span className={styles.tree_list_item_entries_collection}>{collection}</span>
                                   </div>
                                   {this.props.valo[hostname][tenant][collection].map((notebook,pos) =>
                                    (<ol className={styles.tree_list_item_entries} key={`${hostname}/${tenant}/${collection}/${notebook.title}`}>
                                      <li rel={`${hostname}/${tenant}/${collection}/${notebook.title}`}
                                          className={`${styles.tree_list_item_leaf} ${this.props.resourceSelected === (hostname+'/'+tenant+'/'+collection+'/'+notebook.title) ? styles.selected : ''}`}>
                                        <span className={styles.tree_list_item_entries_notebook}>
                                          {notebook.title}.{notebook.ext}
                                        </span>
                                      </li>
                                    </ol>)
                                   )}
                                </li>
                              </ol>)
                           )}
                         </li>
                       </ol>)
                     )}
                  </li>
              </ol>
            </div>)
          )}
        </div>
        <div className={styles.tree_view_resizer}></div>
      </div>
    );
  }
}

ResourcesTree.propTypes = {
  valo: React.PropTypes.object,
  resourceSelected: React.PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  changeResourceSelected: resource => dispatch(changeResourceSelected(resource)),
  addTreeResource: resource => dispatch(addTreeResource(resource))
});

const mapStateToProps = createStructuredSelector({
  valo: selectValo(),
  resourceSelected: selectResource()
});

export default connect(mapStateToProps, mapDispatchToProps)(mouseTrap(ResourcesTree));
