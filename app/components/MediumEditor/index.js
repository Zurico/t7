// MIT: FormidableLabs/component-playground

import blacklist from 'blacklist';
import React from 'react';
import ReactDOM from 'react-dom';
import 'katex/dist/katex.min.css';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import MediumEditor from 'medium-editor';
import katex from 'katex';

const KatexButton = MediumEditor.Extension.extend({
  name: 'katex',

  init: function () {

    this.button = this.document.createElement('button');
    this.button.classList.add('medium-editor-action');
    this.button.innerHTML = '<b>M</b>';
    this.button.title = 'Katex';

    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  getButton: function () {
    return this.button;
  },

  handleClick: function (event) {

    var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                //range.deleteContents();
                console.log(range);

            }
        }

    const el = document.createElement('span');
    const tn = document.createTextNode('');

    this.base.getSelectedParentElement().appendChild(el);
    this.base.getSelectedParentElement().appendChild(tn);

  //  katex.render("c = \\pm\\sqrt{a^2 + b^2}", this.refs.math, { displayMode: true });
    katex.render(this.base.getSelectedParentElement().textContent, this.base.getSelectedParentElement());
    katex.render(this.base.getSelectedParentElement().textContent, el);
    this.base.checkContentChanged();
  },

  isAlreadyApplied: function (node) {
    return node.classList.contains('katex-display');
  },

  isActive: function () {
    return this.button.classList.contains('medium-editor-button-active');
  },

  setInactive: function () {
    this.button.classList.remove('medium-editor-button-active');
  },

  setActive: function () {
    this.button.classList.add('medium-editor-button-active');
  }
});

export default class ReactMediumEditor extends React.Component {
  static defaultProps = {
    tag: 'div'
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    this.props.options.extensions= {
    'katex': new KatexButton()
    };

    console.log(this.props.options)

    this.medium = new MediumEditor(dom, this.props.options);
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this._updated) {
      this.setState({ text: nextProps.text });
    }

    if (this._updated) this._updated = false;
  }

  render() {
    const tag = this.props.tag;
    const props = blacklist(this.props, 'options', 'text', 'tag', 'contentEditable', 'dangerouslySetInnerHTML');

    Object.assign(props, {
      dangerouslySetInnerHTML: { __html: this.state.text }
    });

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, props);
  }

  change(text) {
    if (this.props.onChange) this.props.onChange(text, this.medium);
  }
}
