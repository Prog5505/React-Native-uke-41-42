import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// Bruke state til å lagre et passord og vise en advarsel hvis det er for kort.

export default function Oppgave3() {
  const [passord, setPassord] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Passord</Text>
      </View>

      <Text style={styles.label}>Skriv inn passordet ditt:</Text>

      <TextInput
        style={styles.input}
        value={passord}
        onChangeText={setPassord}
        placeholder="Skriv her..."
      />

      <Text style={styles.label}>Passordet ditt er: {passord}</Text>

      {passord.length < 5 && (
        <Text style={styles.warning}>Passordet må minst ha 5 tegn</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: '#373F51',
    padding: 50,
    marginTop: 20,
    alignItems: 'center', 
    right: 20,
    width: 400,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 65,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#747171',
    padding: 10,
    marginTop: 1,
    fontSize: 18,
  },
  warning: {
    marginTop: 200,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

