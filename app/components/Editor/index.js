// MIT: FormidableLabs/component-playground
import React from 'react';
import CodeMirror from 'codemirror';
import CodeMirrorMarkSelection from 'codemirror/addon/selection/mark-selection';
import CodeMirrorActiveLine from 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import './theme/styles.css';
import js from 'codemirror/mode/javascript/javascript';
import PubSub from 'utils/pubsub';
import styles from './styles.css';

const Editor = React.createClass({
  propTypes: {
    theme: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    codeText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  componentWillMount() {
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.FUZZY_FINDER_CLOSED, () => this.fuzzyFinderClosed());
  },

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  },

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

    this.enableMouseTrapShortcut();

    //this.editor.on('change', this._handleChange);
  },

  fuzzyFinderClosed(){
    // Remember what editor was actived and filter by it
    //if (!this.last_editor_actived) return;
    this.editor.focus();
  },

  enableMouseTrapShortcut(){
    Array.from(this.refs.editor_wrapper.querySelectorAll('textarea')).forEach(textarea => textarea.classList.add('mousetrap'))
  },

  componentDidUpdate() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  componentWillReceiveProps(nextProps) {
    const codeText= nextProps.codeText;

    if(this.props.codeText !== codeText) {
      const oldCursor = this.editor.getCursor();

      this.editor.setValue(codeText);
      this.editor.setCursor(oldCursor);
    }
  },

  _handleChange() {
    if (!this.props.readOnly && this.props.onChange) {
      this.props.onChange(this.editor.getValue());
    }
  },

  render() {
    var editor = <textarea ref="editor" defaultValue={this.props.codeText} />;

    return (
      <div ref="editor_wrapper" className={`${styles.editor} ${this.props.className}`}>
        {editor}
      </div>
    );
  }
});

export default Editor;
