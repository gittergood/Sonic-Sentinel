import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Button } from 'react-native-elements';

export default function FetchField() {
  const [destination, setDestination] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  const firestore = getFirestore(); // Get the Firestore instance

  const fetchData = async () => {
    try {
      const docRef = doc(firestore, 'dennis', "paths");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const specificField = docSnap.data().destination; // Adjust 'yourFieldName' to your specific field
        setFieldValue(specificField || 'Field not found');
      } else {
        setFieldValue('No such document!');
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      setFieldValue('Failed to fetch data');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Current Paths</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDestination}
        value={destination}
        placeholder="Enter document ID (e.g., bathroom)"
      />
      <Button
        title="Fetch Field"
        onPress={fetchData}
        buttonStyle={styles.button}
      />
      <Text style={styles.text}>{fieldValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '90%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    color: '#000',
    paddingVertical: 20,
  },
});
