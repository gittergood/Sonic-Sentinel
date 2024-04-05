import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, doc, setDoc, collection, addDoc } from '@firebase/firestore';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";


export default function add() {
    const [destination, setDestination] = useState('');
    const [node1, setNode1] = useState('');
    const [node2, setNode2] = useState('');
    const [node3, setNode3] = useState('');
    const [node4, setNode4] = useState('');

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

        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} > 
            <Button title="Submit" onPress={() => { showMessage({message: "Notice", type: "success", floating:true,
            duration: 3000,   description: "Submitted"}); }} />
        </LinearGradient>

        <FlashMessage position="top" />
        <StatusBar style="auto" />
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
