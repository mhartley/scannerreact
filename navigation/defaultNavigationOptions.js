import React from 'react'
import CustomHeader from './components/customHeader'

import Colors from '../constants/style/Colors'

export default {
  //header: props => <CustomHeader {...props} />,
  headerStyle: {
    backgroundColor: Colors.tintColor,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#fff",
  },
  headerTintColor: "#fff",
  animationEnabled: true
}
