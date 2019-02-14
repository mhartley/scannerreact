import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../constants/style/Colors';

export default class TabBarIcon extends React.Component {
  
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={[{ marginBottom: -3 }, this.props.style]}
        color={this.props.focused ? Colors.tabSelected : Colors.tabDefault}
      />
    );
  }
  
  
}
