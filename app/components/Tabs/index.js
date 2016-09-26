import React from 'react';

function Tabs(props) {
  return (
    <div>{React.Children.toArray(props.children)}</div>
  );
}

Tabs.propTypes = {
  children: React.PropTypes.node,
};

export default Tabs;
