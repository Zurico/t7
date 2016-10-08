import React from 'react';
import { mouseTrap } from 'react-mousetrap';
import messages from './messages';
import styles from './styles.css';
import PubSub from 'utils/pubsub';
import HotKeys from 'utils/hotkeys';

class FuzzyFinder extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {items: [], topic: '', visible: false, selected: 0, input: ''};
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.EXIT_FUZZY_FINDER.keys, this.cancelByKey.bind(this));
    this.props.bindShortcut(HotKeys.MOVE_DOWN_FUZZY_FINDER.keys, this.moveDown.bind(this));
    this.props.bindShortcut(HotKeys.MOVE_UP_FUZZY_FINDER.keys, this.moveUp.bind(this));
    this.props.bindShortcut(HotKeys.ENTER_FUZZY_FINDER.keys, this.selectByEnter.bind(this));
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.FUZZY_FINDER_REQUIRED, this.reset.bind(this));
  }

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  reset(topic, message){
    this.setState({...message, selected: 0, visible: true});
    this.refs.searchInput.focus();
  }

  moveDown(){
    this.setState({selected: (this.state.selected+1) % this.state.items.length});
    this.updateScroll();
  }

  moveUp(){
    this.state.selected ?
      this.setState({selected: (this.state.selected-1) % this.state.items.length}) :
      this.setState({selected: this.state.items.length-1});
    this.updateScroll();
  }

  selectByEnter(){
    this.close(this.state.items[this.state.selected].value);
    // Prevent default
    return HotKeys.ENTER_FUZZY_FINDER.default;
  }

  // @todo this currently depends on item <li> height size and <ol> height size, make it to work without that dependence
  updateScroll(){

    if(this.state.selected < 6) return this.refs.itemsList.scrollTop = 0;
    else if(this.state.selected == 6) return this.refs.itemsList.scrollTop = 19;
    else this.refs.itemsList.scrollTop = 19 + ((this.state.selected-6)*47);
    // this.refs.itemsList.scrollTop = ((this.state.selected-1)*47) - this.refs.itemSelected.offsetTop;
  }

  cancelByKey(){
    this.close();
    // Prevent default
    return HotKeys.EXIT_FUZZY_FINDER.default;
  }

  cancelByClick(event){
    const target = event.target;
    const meta = target.getAttribute('rel');
    if(target.tagName.toLowerCase() === 'div') return this.close();
    if(target.tagName.toLowerCase() === 'li') return this.close(meta);
  }

  close(emit){
    this.setState({visible: false});
    if(emit) PubSub.publish(this.state.topic, emit);
  }

  render(){
    return (
      <div className={`${this.state.visible ? styles.modal : styles.hidden}`}>
        <div className={styles.overlay} onClick={this.cancelByClick.bind(this)}>
          <input ref="searchInput" className={`${styles.text_editor} mousetrap`} type="text" />
          <ol ref="itemsList" className={styles.list_group}>
            {
              this.state.items.map((item, pos) =>
                <li key={item.value}
                    className={`${item.marked ? styles.actived : ''} ${this.state.selected == pos ? styles.selected : ''}`}
                    rel={item.value}>
                  {item.title}
                </li>)
            }
          </ol>
        </div>
      </div>
    );
  }

}

export default mouseTrap(FuzzyFinder);
