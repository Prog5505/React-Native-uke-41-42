import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <View style={{ backgroundColor: 'red', padding: 50 }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
          En app
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 0 }}>
        <View style={{ width: 60, height: 60, backgroundColor: 'lime' }} />
        <View style={{ width: 60, height: 60, backgroundColor: 'yellow', marginTop: 60 }} />
        <View style={{ width: 60, height: 60, backgroundColor: 'black' }} />
      </View>

      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tekst som er uten mening!</Text>
      </View>

      <View style={{ marginTop: 300, alignItems: 'center' }}>
        <View style={{ backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 18 }}>OK</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}



