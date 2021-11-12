import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function AppSwitch({ name, items }) {

  const { setFieldValue, values } = useFormikContext()

  const [selectedItem, setSelectedItem] = useState(0)

  const handleChoice = (id) => {
    setSelectedItem(id)
    setFieldValue(name, items[0].label)
  }

  return (
    <View style={styles.types}>
      <TouchableOpacity
        onPress={() => handleChoice(0)}
        style={!selectedItem ? [styles.typeInscription, styles.typeInscriptionActive] : styles.typeInscription}
      >
        <Text style={styles.textType}>{items[0].label}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleChoice(1)}
        style={selectedItem ? [styles.typeInscription, styles.typeInscriptionActive] : styles.typeInscription}
      >
        <Text style={styles.textType}>{items[1].label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AppSwitch;

const styles = StyleSheet.create({
  types: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.medium,
    marginVertical: 10,
    borderRadius: 6,
    padding: 2,
  },
  typeInscription: {
    width: "50%",
    padding: 6,
  },
  typeInscriptionActive: {
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  textType: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "700"
  }
})