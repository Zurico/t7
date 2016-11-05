import React from 'react';
import styles from './styles.css';
import messages from './messages';
import { connect } from 'react-redux';
import { mouseTrap } from 'react-mousetrap';
import { createStructuredSelector } from 'reselect';
import { selectValo, selectResource } from './selectors';
import {changeResourceSelected, addToWorkSpace, addTreeResource} from './actions';
import { push } from 'react-router-redux';
import HotKeys from 'utils/hotkeys';
import PubSub from 'utils/pubsub';
import * as Register from 'utils/register';
import * as Resources from 'utils/resources';

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

  componentDidUpdate(){}

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
    //if a notebook
    if(resource.split('/').length === 4){
      const target = this.refs.tree_view.querySelector(`li [rel="${resource}"]`).parentElement.parentElement;
      Array.from(target.querySelectorAll('ol')).forEach(item => item.style.display = "block");
      target.querySelector('div').classList.remove(styles.tree_list_item_header_collapsed);
    }
  }

  toggleSubtree(root, subtree){
    if(subtree) Array.from(subtree).forEach(item => item.style.display = item.style.display == "none" ? "block" : "none");
    if(root) root.classList.toggle(styles.tree_list_item_header_collapsed);
  }

  select(event){
    let target = event.target;
    while(target && target.tagName.toLowerCase() != 'li') target = target.parentElement;
    if(!target) return;
    this.props.changeResourceSelected(target.getAttribute('rel'));
    this.toggleSubtree(target.querySelector('div'), target.querySelectorAll('ol'));
    return target.getAttribute('rel');
  }

  open(event){

    const resource = this.select(event);

    if(Resources.isNotebook(resource)){
      this.props.addToWorkSpace({
        type: Register.EXT,
        source: Resources.getExt(resource),
        meta: resource,
        title: Resources.getNotebookTitle(resource),
        id: resource
      });

      this.props.changeRoute('/workspace');
    }

  }

  render(){

    console.log(this.props.valo);

    return (
      <div className={styles.container}>
        <div className={styles.global_scroller}>
          <div className={styles.tree_view_scroller} onDoubleClick={this.open.bind(this)} onClick={this.select.bind(this)} ref="tree_view">
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
                                      (<ol className={styles.tree_list_item_entries} key={`${hostname}/${tenant}/${collection}/${notebook.title}.${notebook.ext}`}>
                                        <li rel={`${hostname}/${tenant}/${collection}/${notebook.title}.${notebook.ext}`}
                                            className={`${styles.tree_list_item_leaf} ${this.props.resourceSelected === (hostname+'/'+tenant+'/'+collection+'/'+notebook.title+'.'+notebook.ext) ? styles.selected : ''}`}>
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
        </div>
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
  addToWorkSpace: resource => dispatch(addToWorkSpace(resource)),
  addTreeResource: resource => dispatch(addTreeResource(resource)),
  changeRoute: url => dispatch(push(url)),
});

const mapStateToProps = createStructuredSelector({
  valo: selectValo(),
  resourceSelected: selectResource()
});

export default connect(mapStateToProps, mapDispatchToProps)(mouseTrap(ResourcesTree));
