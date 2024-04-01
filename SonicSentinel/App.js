import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { getFirestore, doc, setDoc, collection, addDoc } from '@firebase/firestore';
import { Overlay, Button, FAB, Icon, Divider, ButtonGroup } from 'react-native-elements';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { useState } from 'react';

export default function App() {
  const [destination, setDestination] = useState('');
  const [node1, setNode1] = useState(0);
  const [node2, setNode2] = useState(0);
  const [node3, setNode3] = useState(0);
  const [node4, setNode4] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Insert Path Information</Text>

      <TextInput onChangeText={setDestination}
        value={destination}/>

      <TextInput onChangeText={setNode1}
        value={Node1}/>

      <TextInput onChangeText={setNode2}
        value={node2}/>

      <TextInput onChangeText={setNode3}
        value={node3}/>

      <TextInput onChangeText={setNode4}
        value={node4}/>

      <Button title="Submit"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
