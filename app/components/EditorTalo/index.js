// MIT: FormidableLabs/component-playground
import React from 'react';
import ReactDOM from 'react-dom';
import TextPanel from 'components/TextPanel';
import CommandPanel from 'components/CommandPanel';
import styles from './styles.css';
//import * as sdk from 'sdk'; //rx, ramda, superagent, evetnsource, url, events, loglevel

class EditorTalo extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {

    const defaultTextPanel = { text: 'Your story begins here ... c = \\pm\\sqrt{a^2 + b^2}' };
    const defaultCommandPanel = { command: ':help' };

    return (
      <div className={styles.container}>
        <TextPanel panel={defaultTextPanel}/>
        <CommandPanel panel={defaultCommandPanel}/>
      </div>
    );
  }

}
export default EditorTalo;
