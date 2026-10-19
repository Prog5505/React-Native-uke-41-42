import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

export default function Index() {
  return (
    // Container som sentrerer alt innhold på skjermen
    <View style={styles.container}>
      {/* Bilde fra internett hentet ved hjelp av Image-komponenten */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51AtgMuqjfVUY5XGAj2Nvjrhmrq5EiyTDLkZrv06wyA&s=10' }}
        style={styles.bilde}
      />

      {/* Andre bilde også hentet fra nett */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmx3ABBf_RqyqXO4meZAmwmCXql2qmRzV2sLbb_8CJw&s=10' }}
        style={styles.bilde}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  bilde: {
    width: 300,
    height: 200,
    marginVertical: 15,
  },
});