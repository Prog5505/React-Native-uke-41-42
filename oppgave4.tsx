import { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';

// Lager en teller som kan økes og reduseres ved hjelp av knapper.

export default function App() {

  // State-variabel som holder styr på tallet som vises
  const [teller, setTeller] = useState(0);

  // Funksjon som øker telleren med 1
  const økTeller = () => {
    setTeller(teller + 1);
  };

  // Funksjon som reduserer telleren med 1, men ikke under 0
  const reduserTeller = () => {
    if (teller > 0) {
      setTeller(teller - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <Pressable style={styles.knapp} onPress={økTeller}>
        <Text style={styles.knappTekst}>Øk teller</Text>
   </Pressable>

      </View>

      <View style={styles.buttonBox}>
        <Pressable style={styles.knapp} onPress={reduserTeller}>
        <Text style={styles.knappTekst}>Reduser teller</Text>
  </Pressable>

      </View>

      <Text style={styles.label}>Teller er:</Text>

      <View style={styles.counterBox}>
        <Text style={styles.counterText}>{teller}</Text>
      </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    marginVertical: 10,
    width: '60%',
  },
  label: {
    marginTop: 90,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  counterBox: {
    marginTop: 10,
    backgroundColor: '#d5dbe6',
    padding: 60,
    borderRadius: 10,
  },
  counterText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  knapp: {
  backgroundColor: '#487281',
  padding: 10,
  borderRadius: 10,
  marginVertical: 1,
  width: '100%',
  alignItems: 'center',
  fontWeight: 'bold',
},

knappTekst: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
  
},

});
