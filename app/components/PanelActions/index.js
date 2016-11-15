// MIT: FormidableLabs/component-playground
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import Octicon from 'react-octicon';

class PanelActions extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentDidMount() {}

  render() {

    return (
        <Octicon name="ellipsis " className={`${styles.actions}`}/>
    );

  }

}
export default PanelActions;
