// MIT: FormidableLabs/component-playground
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import Octicon from 'react-octicon';
import CodeMirror from 'codemirror';
import PanelActions from 'components/PanelActions';
import './theme/styles.css';
import 'codemirror/mode/sql/sql';
//import * as sdk from 'sdk'; //rx, ramda, superagent, evetnsource, url, events, loglevel

class CommandPanel extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentDidMount() {

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'sql',
      lineNumbers: false,
      lineWrapping: true,
      smartIndent: false,
      matchBrackets: true,
      theme: "talo"
    });

    this.editor.getWrapperElement().style["font-size"] = "11px";
    this.editor.refresh();
    this.editor.focus();

    //this.editor.on('change', this._handleChange);
  }

  render() {

    var editor = <textarea ref="editor" defaultValue={this.props.panel.command} />;

    return (
      <div className={`${styles.container}`}>
        <div ref="editor_wrapper" className={`${styles.editor}`}>
          {editor}
        </div>
        <PanelActions/>
      </div>
    );

  }

}
export default CommandPanel;
