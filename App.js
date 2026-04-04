import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Status from './components/StatusBar';

export default function App() {
  return (
    <View style={styles.container}>
      <Status />

      <View style={styles.content}>
        <Text>content</Text>
      </View>
      
      <View style={styles.toolbar}>
        <Text>toolbar</Text>
        
      </View>
      
      <View style={styles.inputMethodEditor}>
        <Text>inputMethodEditor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
    borderWidth:2,
  },
});