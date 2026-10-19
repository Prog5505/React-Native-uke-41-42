import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";

// Henter værdata fra OpenWeather API, enten via bynavn eller GPS-posisjon.

export default function Oppgave5() {

  // State som lagrer byen brukeren skriver inn
  const [city, setCity] = useState("");
  // State som lagrer værdata etter søk
  const [weather, setWeather] = useState(null);

  // Henter vær for en by (API-kall til OpenWeather)
  const getWeather = async (overrideCity) => {
    const chosenCity = overrideCity || city;
    if (!chosenCity) return;

    try {
      const apiKey = "e64177bd75ff2a2a62ed766b553c852e"; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      // Hvis API ikke finner byen
      if (data.cod !== 200) {
        alert("Fant ikke byen. Prøv igjen.");
        return;
      }
     
      // Lagrer relevant værinfo i state
      setWeather({
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.log("Feil:", error);
    }
  };

  // Henter vær basert på GPS-posisjon
  const getLocationWeather = async () => {
    try {
      // Ber om tillatelse til å bruke posisjon
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Tillatelse til posisjon ble ikke gitt.");
        return;
      }
      
      // Henter GPS-posisjon
      let pos = await Location.getCurrentPositionAsync({});
      
      // Her konverterer GPS-koordinater til bynavn
      let geo = await Location.reverseGeocodeAsync(pos.coords);

      const cityName = geo[0].city;
      setCity(cityName);        // Oppdaterer inputfeltet med bynavnet                    
      getWeather(cityName);     // Henter vær for denne byen
    } catch (error) {
      console.log("GPS-feil:", error);
    }
  };

  // Bakgrunnsfarge basert på været
  const getBackgroundColor = () => {
    if (!weather) return "#8bccf1";

    const desc = weather.description.toLowerCase();

    if (desc.includes("cloud")) return "#cfd3d6";
    if (desc.includes("rain")) return "#9bb4c9";
    if (desc.includes("clear")) return "#87ceeb";
    if (desc.includes("snow")) return "#f2f7ff";

    return "#8bccf1";
  };

  return (
    // Dynamisk bakgrunnsfarge basert på vær
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.title}>Været</Text>

      <TextInput
        style={styles.input}
        placeholder="Søk etter en by..."
        value={city}
        onChangeText={setCity}
      />

      <Pressable style={styles.button} onPress={() => getWeather()}>
        <Text style={styles.buttonText}>Søk</Text>
      </Pressable>

      <Pressable style={[styles.button, { marginTop: 10 }]} onPress={getLocationWeather}>
        <Text style={styles.buttonText}>Bruk min posisjon</Text>
      </Pressable>

      
      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.city}</Text>

          <Text
            style={[
              styles.temp,
              weather.temp < 0 && { color: "red" }, // Rød ved minus
            ]}
          >
            {weather.temp}°
          </Text>

          <Text style={styles.desc}>{weather.description}</Text>

          <Image
            style={{ width: 120, height: 120, marginTop: 10 }}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8bccf1",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontWeight: "800",
  },
  button: {
    backgroundColor: "#4a6fa5",
    padding: 12,
    borderRadius: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  result: {
    marginTop: 30,
    alignItems: "center",
  },
  city: {
    fontSize: 26,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    marginTop: 5,
  },
});
