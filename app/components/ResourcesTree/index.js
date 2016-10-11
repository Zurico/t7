import React from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectValo } from './selectors';

class ResourcesTree extends React.Component {

  render(){
    return (
      <div className={styles.container}>
        <div className={styles.tree_view_scroller}>
        { Object.keys(this.props.valo).map(hostname =>
            (<div className={styles.tree_wrapper} key={hostname}>
                <ol className={styles.tree_list} tabIndex="-1">
                  <li className={styles.tree_list_item}>
                     <div className={styles.tree_list_item_header}>
                       <span className={styles.tree_list_item_entries_repo}>
                         {hostname}
                       </span>
                     </div>
                     { Object.keys(this.props.valo[hostname]).map(tenant =>
                       (<ol className={styles.tree_list_item_entries} key={`${hostname}-${tenant}`}>
                         <li>
                           <div className={styles.tree_list_item_header}>
                             <span className={styles.tree_list_item_entries_tenant}>{tenant}</span>
                           </div>
                           { Object.keys(this.props.valo[hostname][tenant]).map(collection =>
                             (<ol className={styles.tree_list_item_entries} key={`${hostname}-${tenant}-${collection}`}>
                                <li>
                                   <div className={styles.tree_list_item_header}>
                                     <span className={styles.tree_list_item_entries_collection}>{collection}</span>
                                   </div>
                                   {this.props.valo[hostname][tenant][collection].map(notebook =>
                                    (<ol className={styles.tree_list_item_entries} key={`${hostname}-${tenant}-${collection}-${notebook.title}`}>
                                      <li className={`${styles.tree_list_item_leaf} ${styles.selected}`}>
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
  valo: React.PropTypes.object
};

const mapStateToProps = createSelector(selectValo(), valo => ({valo}));

export default connect(mapStateToProps)(ResourcesTree);
