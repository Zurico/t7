import React from 'react';
import { mouseTrap } from 'react-mousetrap';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import PubSub from 'utils/pubsub';
import HotKeys from 'utils/hotkeys';
import {Option} from 'utils/helper';

class FuzzyFinder extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {items: [], topic: '', visible: false, selected: 0, input: '', filter: '', noMatchesText: messages.notFound, enableCustomSelection: false};
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(HotKeys.EXIT_FUZZY_FINDER.keys, this.cancelByKey.bind(this));
    this.props.bindShortcut(HotKeys.MOVE_DOWN_FUZZY_FINDER.keys, this.moveDown.bind(this));
    this.props.bindShortcut(HotKeys.MOVE_UP_FUZZY_FINDER.keys, this.moveUp.bind(this));
    this.props.bindShortcut(HotKeys.ENTER_FUZZY_FINDER.keys, this.selectItemByEnter.bind(this));
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(PubSub.topics.FUZZY_FINDER_REQUIRED, this.reset.bind(this));
  }

  componentWillUnmount(){
    // Unsubscribe to fuzzy finder lang messages
    if(this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  filter(item){
    return this.context.intl.formatMessage({id:item.title}).toLowerCase().includes(this.state.filter.toLowerCase());
  }

  updateFilter(event){
    this.setState({filter: event.target.value});
  }

  reset(topic, message){
    this.setState({selected: 0, visible: true, filter: '', enableCustomSelection: false, noMatchesText: messages.notFound, ...message});
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

  selectItemByEnter(){
    this.selectItem();
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

  highlightItem(event){
    const target = event.target.tagName.toLowerCase() === 'span' ? event.target.parentElement : event.target;
    const position = target.getAttribute('rel');
    if(target.tagName.toLowerCase() === 'input') return;
    if(target.tagName.toLowerCase() !== 'li') return this.close();
    else return this.setState({selected: position});
  }

  selectItemByClick(event){
    const target = event.target.tagName.toLowerCase() === 'span' ? event.target.parentElement : event.target;
    if(target.tagName.toLowerCase() === 'input') return;
    if(this.refs.searchInput === document.activeElement) return;
    if(target.tagName.toLowerCase() !== 'li') return this.close();
    if(target.classList.contains('no-select')) return;
    if(target.getAttribute('rel') != this.state.selected) return;
    this.selectItem();
  }

  selectItem() {
    const selectedItem = this.state.items.filter(this.filter.bind(this))[this.state.selected];
    if(selectedItem) return this.close(selectedItem.value);
    if(this.state.enableCustomSelection) return this.close(this.state.filter);
  }

  close(emit){
    this.setState({visible: false});
    if(emit) PubSub.publish(this.state.topic, emit);
    PubSub.publish(PubSub.topics.FUZZY_FINDER_CLOSED);
  }

  render(){
    return (
      <div className={`${this.state.visible ? styles.modal : styles.hidden}`}>
        <div className={styles.overlay} onMouseDown={this.highlightItem.bind(this)} onMouseUp={this.selectItemByClick.bind(this)}>
          <input ref="searchInput" className={`${styles.text_editor} mousetrap`} type="text" value={this.state.filter} onChange={this.updateFilter.bind(this)}/>
          <ol ref="itemsList" className={styles.list_group}>
            {
              Option(this.state.items.filter(this.filter.bind(this)).map((item, pos) =>
                <li key={item.value}
                    className={`${item.marked ? styles.actived : ''} ${this.state.selected == pos ? styles.selected : ''}`}
                    rel={pos}>
                    {item.hint ? <div className={styles.hint_container}><kbd className={styles.hint}>{item.hint}</kbd></div> : null}
                    <FormattedMessage id={item.title} />
                </li>), <li className={`${styles.no_results} no-select`}><FormattedMessage {...this.state.noMatchesText} /></li>)
            }
          </ol>
        </div>
      </div>
    );
  }

}

FuzzyFinder.contextTypes = {
 intl: React.PropTypes.object.isRequired
};

export default mouseTrap(FuzzyFinder);
