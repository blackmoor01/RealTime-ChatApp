import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MainStackNavigator from "./source/mainstacknavigation/MainStackNavigation";
import tw from 'twrnc';
import {Provider} from "react-redux"
import Store from "./context/store";

export default function App() {
  return (
      <Provider store={Store}>
          <SafeAreaView style={tw `flex-1`}>
              <MainStackNavigator/>
          </SafeAreaView>
      </Provider>
  );
};