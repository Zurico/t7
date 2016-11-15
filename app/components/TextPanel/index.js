// MIT: FormidableLabs/component-playground
import React from 'react';
import ReactDOM from 'react-dom';
import Octicon from 'react-octicon';
import MediumEditorComponent from 'components/MediumEditor';
import PanelActions from 'components/PanelActions';
//import MediumEditorComponent from 'react-medium-editor';
import styles from './styles.css';

class TextPanel extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {

    //const toolbar = ['bold', 'italic', 'underline', 'strikethrough', 'orderedlist', 'indent', 'outdent', 'h1', 'h2', 'anchor'];
    const toolbar = ['bold', 'italic', 'underline', 'strikethrough', 'h1', 'h2', 'anchor', 'katex'];

    return (
      <div className={`${styles.container}`}>
        <div className={`${styles.text_container}`}>
          <MediumEditorComponent
            tag="div"
            text={this.props.panel.text}
            options={{spellcheck: false, toolbar: {buttons: toolbar}}}
          />
        </div>
        <PanelActions/>
      </div>
    );
  }

}
export default TextPanel;
