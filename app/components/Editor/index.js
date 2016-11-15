// MIT: FormidableLabs/component-playground
import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import CodeMirrorMarkSelection from 'codemirror/addon/selection/mark-selection';
import CodeMirrorActiveLine from 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import { mouseTrap } from 'react-mousetrap';
import './theme/styles.css';
import js from 'codemirror/mode/javascript/javascript';
import PubSub from 'utils/pubsub';
import styles from './styles.css';
import HotKeys from 'utils/hotkeys';
import JSONTree from 'react-json-tree';
import _ from 'lodash';
//import * as sdk from 'sdk'; //rx, ramda, superagent, evetnsource, url, events, loglevel

class Editor extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.RUN_NOTEBOOK.keys, this.runNotebookShortcut.bind(this));
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.FUZZY_FINDER_CLOSED, () => this.fuzzyFinderClosed());
  }

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  componentDidMount() {

    this.editor = CodeMirror.fromTextArea(this.refs.editor, {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      smartIndent: false,
      matchBrackets: true,
      theme: "zenburn",
      readOnly: false,
      styleActiveLine: true,
      styleSelectedText: true
    });

    this.editor.getWrapperElement().style["font-size"] = "11px";
    this.editor.refresh();
    this.editor.setCursor(this.editor.lineCount()+1);
    this.editor.focus();
    this.editor.on('redraw', () => false); // prevent editor to refresh widget output when scrolling
    this.enableMouseTrapShortcut();

    //this.editor.on('change', this._handleChange);
  }

  runNotebookShortcut(){

    const totalLines = this.editor.lineCount();

    const notebookContent = _.range(totalLines)
      .map(line => this.editor.getLine(line).replace('render(', 'render('+(line)+',')).join('\n');

    const render = (line, content, options) => {

      if(this.widgets && this.widgets[line]) this.editor.removeLineWidget(this.widgets[line]);
      this.widgets = {};
      const container =  document.createElement('div');
      this.widgets[line] = this.editor.addLineWidget(line, container, {coverGutter: false, noHScroll: true});
      // const info = this.editor.getScrollInfo();
      // this.editor.scrollTo(null, info.clientHeight);
      // setTimeout(()=>ReactDOM.render(<JSONTree data={content}/>, container), 1000);
      ReactDOM.render(<JSONTree data={content}/>, container);

      // jsdt.charting_v2.ChartingFramework.instance.addVisualization({
      //     query: content,
      //     containerDomElement: container,
      //     onCreated: (data, error) => {
      //
      //     }
      // });

    }

    return Function.apply(null, ['render'].concat(notebookContent))(render);

  }

  fuzzyFinderClosed(){
    // Remember what editor was actived and filter by it
    //if (!this.last_editor_actived) return;
    this.editor.focus();
  }

  enableMouseTrapShortcut(){
    Array.from(this.refs.editor_wrapper.querySelectorAll('textarea')).forEach(textarea => textarea.classList.add('mousetrap'))
  }

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  }

  componentWillReceiveProps(nextProps) {
    const codeText= nextProps.codeText;

    if(this.props.codeText !== codeText) {
      const oldCursor = this.editor.getCursor();

      this.editor.setValue(codeText);
      this.editor.setCursor(oldCursor);
    }
  }

  _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  }

  render() {
    var editor = <textarea ref="editor" defaultValue={this.props.codeText} />;

    return (
      <div ref="editor_wrapper" className={`${styles.editor} ${this.props.className}`}>
        {editor}
      </div>
    );
  }

}

Editor.propTypes = {
  theme: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  codeText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
  className: React.PropTypes.string
}

export default mouseTrap(Editor);
