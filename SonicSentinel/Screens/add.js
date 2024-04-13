import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { getFirestore, doc, setDoc, collection, addDoc } from '@firebase/firestore';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";


export default function add() {

  const [node1, setNode1] = useState();
  const [node2, setNode2] = useState();
  const [node3, setNode3] = useState();
  const [node4, setNode4] = useState();
  const [node5, setNode5] = useState();
  const [node6, setNode6] = useState();
  const [node7, setNode7] = useState();
  const [node8, setNode8] = useState();
  const [node9, setNode9] = useState();
  const [node10, setNode10] = useState();
  const [destination, setDestination] = useState('');

  const uploadDataToFirestore = async (collectionName, docId, data) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data);
      // await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
      showMessage({message: "Notice", type: "success", floating:true,
            duration: 3000,   description: "Data successfully uploaded"});
    } catch (e) {
      console.error("Error adding document: ", e);
      showMessage({message: "Notice", type: "danger", floating:true,
            duration: 3000,   description: "Data failed to upload"});
    }
  };

  return (
      <View style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(5,0,0,0.8)', 'transparent']}
            style={styles.background}
        />
        <Text style={styles.title}>Insert Path Information</Text>

        <Input onChangeText={setDestination} placeholder='Bathroom, Living Room, Kitchen,' value={destination} style={styles.text}/>

        <Input onChangeText={setNode1} placeholder='1' style={styles.text} value={node1}/>

        <Input onChangeText={setNode2} placeholder='2' style={styles.text} value={node2}/>

        <Input onChangeText={setNode3} placeholder='3' style={styles.text} value={node3}/>

        <Input onChangeText={setNode4} placeholder='4' style={styles.text} value={node4}/>

        <Input onChangeText={setNode5} placeholder='5' style={styles.text} value={node5}/>

        <Input onChangeText={setNode6} placeholder='6' style={styles.text} value={node6}/>

        <Input onChangeText={setNode7} placeholder='7' style={styles.text} value={node7}/>

        <Input onChangeText={setNode8} placeholder='8' style={styles.text} value={node8}/>

        <Input onChangeText={setNode9} placeholder='7' style={styles.text} value={node9}/>

        <Input onChangeText={setNode10} placeholder='8' style={styles.text} value={node10}/>

        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} > 
            <Button title="Submit" onPress={() => {  uploadDataToFirestore("dennis", destination, node1);}} />
        </LinearGradient>
        <StatusBar style="light" />
        <FlashMessage position="top" />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 300,
    },
    button: {
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
    },
    text: {
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#000',
    },
    title: {
      color: '#000',
      // paddingTop:'10px',
      paddingBottom:'20px',
      fontSize: 20
    }
});
