import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { getFirestore, doc, setDoc, collection, addDoc } from '@firebase/firestore';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { Overlay, Button, FAB, Icon, Divider, ButtonGroup, Input  } from 'react-native-elements';

export default function add() {
    const uploadDataToFirestore = async (collectionName, docId, data) => {
        try {
          const docRef = doc(db, collectionName, docId);
          await setDoc(docRef, data);
          // await addDoc(collection(db, collectionName), data);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        console.log("done");
    };
    
    return (
        <View>
            <StatusBar style="light" />
            <Text style={styles.text}> Current Paths </Text>
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
