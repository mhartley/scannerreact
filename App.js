import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

//packages
import DeviceInfo from 'react-native-device-info';

//app utils
import reducers from './reducers'

//screens and components
import MainTabNavigator from './navigation/MainTabNavigator'


const store = createStore(reducers);


export default createAppContainer(MainTabNavigator);
