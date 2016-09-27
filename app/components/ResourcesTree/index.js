import React from 'react';
import styles from './styles.css';

function ResourcesTree() {
  return (
    <div className={styles.container}>
      <div className={styles.tree_view_scroller}>
        <ol className={styles.tree_list} tabIndex="-1">
          <li className={styles.tree_list_item}>
            <div className={styles.tree_list_item_header}>
              <span className={styles.tree_list_item_entries_repo}>
                localhost:8888
              </span>
            </div>
            <ol className={styles.tree_list_item_entries}>
              <li>
                <div className={styles.tree_list_item_header}>
                  <span className={styles.tree_list_item_entries_tenant}>Tenant 1</span>
                </div>
                <ol className={styles.tree_list_item_entries}>
                  <li>
                    <div className={styles.tree_list_item_header}>
                      <span className={styles.tree_list_item_entries_collection}>Collection 1</span>
                    </div>
                    <ol className={styles.tree_list_item_entries}>
                      <li className={`${styles.tree_list_item_leaf} ${styles.selected}`}>
                        <span className={styles.tree_list_item_entries_notebook}>
                          Notebook_1.js
                        </span>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </div>
      <div className={styles.tree_view_resizer}></div>
    </div>
  );
}

export default ResourcesTree;
