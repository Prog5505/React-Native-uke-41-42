import React, { useState } from "react";
import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function App() {
  const [antallTegn, setAntallTegn] = useState("");
  const [passord, setPassord] = useState("");
  const [isEnabledStoreBokstaver, setIsEnabledStoreBokstaver] = useState(false);
  const [isEnabledSmaaBokstaver, setIsEnabledSmaaBokstaver] = useState(false);
  const [isEnabledTall, setIsEnabledTall] = useState(false);
  const [isEnabledSymboler, setIsEnabledSymboler] = useState(false);

  // Oppgave 6: minimum antall symboler
  const [minSymboler, setMinSymboler] = useState("0");

  // Funksjon som teller hvor mange symboler et passord inneholder
  function tellSymboler(passordArray) {
    const symboler = ["#", "$", "%", "&", "*"];
    return passordArray.filter((t) => symboler.includes(t)).length;
  }

  // Funksjon som genererer et nytt passord basert på brukerens valg
  function genererPassord(
  isSmaaBokst,
  isStoreBokst,
  isTall,
  isSymb,
  antTegn
) {

    let smaaBokstaver = "abcdefghijklmnopqrstuvwxyz".split("");
    let storeBokstaver = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let tall = "0123456789".split("");
    let symboler = ["#", "$", "%", "&", "*"];

    let lovligeTegn = [];

    if (isSmaaBokst) lovligeTegn = lovligeTegn.concat(smaaBokstaver);
    if (isStoreBokst) lovligeTegn = lovligeTegn.concat(storeBokstaver);
    if (isTall) lovligeTegn = lovligeTegn.concat(tall);
    if (isSymb) lovligeTegn = lovligeTegn.concat(symboler);

    const tegnAntall = Number(antTegn);
    let passordArray = [];

    for (let i = 0; i < tegnAntall; i++) {
      passordArray.push(
        lovligeTegn[Math.floor(Math.random() * lovligeTegn.length)]
      );
    }

    // Oppgave 6: sjekk minimum symboler
    if (isSymb) {
      const antSymboler = tellSymboler(passordArray);
      if (antSymboler < Number(minSymboler)) {
        return genererPassord(
          isSmaaBokst,
          isStoreBokst,
          isTall,
          isSymb,
          antTegn
        );
      }
    }

    return passordArray.join("");
  }

  // Når brukeren trykker generer passord, så sjekker vi først om passordet som allerede
  // er generert oppfyller kravet for minimum antall spesialtegn. Hvis passordet har
  // nok symboler, skal det ikke endres. Hvis det mangler symboler, så genererer vi et nytt passord med de valgte innstillingene.

  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <Text style={styles.text_heading}>Passordgenerator</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.line}>
          <Text style={styles.text_line}>Store bokstaver</Text>
          <Switch
            style={styles.switchstyle}
            thumbColor={isEnabledStoreBokstaver ? "#f4f310" : "#f4f3f4"}
            onValueChange={() =>
              setIsEnabledStoreBokstaver(!isEnabledStoreBokstaver)
            }
            value={isEnabledStoreBokstaver}
          />
        </View>

        <View style={styles.line}>
          <Text style={styles.text_line}>Små bokstaver</Text>
          <Switch
            style={styles.switchstyle}
            thumbColor={isEnabledSmaaBokstaver ? "#f4f310" : "#f4f3f4"}
            onValueChange={() =>
              setIsEnabledSmaaBokstaver(!isEnabledSmaaBokstaver)
            }
            value={isEnabledSmaaBokstaver}
          />
        </View>

        <View style={styles.line}>
          <Text style={styles.text_line}>Tall</Text>
          <Switch
            style={styles.switchstyle}
            thumbColor={isEnabledTall ? "#f4f310" : "#f4f3f4"}
            onValueChange={() => setIsEnabledTall(!isEnabledTall)}
            value={isEnabledTall}
          />
        </View>

        <View style={styles.line}>
          <Text style={styles.text_line}>Symboler</Text>
          <Switch
            style={styles.switchstyle}
            thumbColor={isEnabledSymboler ? "#f4f310" : "#f4f3f4"}
            onValueChange={() => setIsEnabledSymboler(!isEnabledSymboler)}
            value={isEnabledSymboler}
          />
        </View>

        {/* Oppgave 6 inputfelt */}
        <View style={styles.line}>
          <Text style={styles.text_line}>Min. spesialtegn</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={minSymboler}
            onChangeText={setMinSymboler}
          />
        </View>

        <View style={styles.line}>
          <Text style={styles.text_line}>Antall tegn</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={antallTegn}
            onChangeText={setAntallTegn}
          />
        </View>
      </View>

      <View style={styles.container4}>
        <Button
          title="Generer passord"
          onPress={() => {
    const min = Number(minSymboler);

    // Sjekk passordet som allerede er generert
    if (isEnabledSymboler && min > 0 && passord) {
      const passordArray = passord.split("");
      const antSymboler = tellSymboler(passordArray);

      if (antSymboler >= min) {
        // Oppgaven: ikke endre passordet
        return;
      }
    }

    // Ellers: generer nytt passord
    setPassord(
      genererPassord(
        isEnabledSmaaBokstaver,
        isEnabledStoreBokstaver,
        isEnabledTall,
        isEnabledSymboler,
        antallTegn
       )
     );
   }}       
 />
 </View>

      <View style={styles.container3}>
        <Text style={styles.text_line2}>Passord:</Text>
        <Text style={styles.text_line3} selectable>
          {passord}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container1: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 2,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20,
  },
  container3: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container4: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  input: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "#f5f5f5",
    width: 100,
  },
  switchstyle: {
    trackColor: { false: "#767577", true: "#81b0ff" },
    ios_backgroundColor: "#3e3e3e",
  },
  text_heading: {
    color: "white",
    fontSize: 35,
  },
  text_line: {
    color: "black",
    fontSize: 20,
  },
  text_line2: {
    color: "black",
    fontSize: 20,
  },
  text_line3: {
    color: "white",
    fontSize: 20,
    backgroundColor: "grey",
    padding: 10,
  },
});
