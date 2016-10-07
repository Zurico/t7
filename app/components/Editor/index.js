// MIT: FormidableLabs/component-playground
import React from 'react';
import CodeMirror from 'codemirror';
import activine from 'codemirror-activine';
import 'codemirror/lib/codemirror.css';
import './theme/styles.css';
import js from 'codemirror/mode/javascript/javascript';
import styles from './styles.css';

// CodeMirror Addons
activine(CodeMirror);

const Editor = React.createClass({
  propTypes: {
    theme: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    codeText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    style: React.PropTypes.object,
    className: React.PropTypes.string
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
      activeLine: true
    });

    this.editor.getWrapperElement().style["font-size"] = "11px";
    this.editor.refresh();
    this.editor.setCursor(this.editor.lineCount()+1);
    this.editor.focus();
    //this.editor.on('change', this._handleChange);
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
      <div className={`${styles.editor} ${this.props.className}`}>
        {editor}
      </div>
    );
  }
});

export default Editor;
