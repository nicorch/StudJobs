import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function AppSwitch({ name, items, style }) {

  const { setFieldValue, values } = useFormikContext()

  const [selectedItem, setSelectedItem] = useState(0)

  const handleChoice = (id) => {
    setSelectedItem(id)
    setFieldValue(name, items[id].label)
  }

  const typeInscription = style ? { width: "30%", padding: 6 } : { width: "50%", padding: 6 }

  return (
    <View style={styles.types}>

      {items.map(choice => (
        <TouchableOpacity
          onPress={() => handleChoice(choice.id)}
          style={selectedItem === items.indexOf(items[choice.id]) ? [typeInscription, styles.typeInscriptionActive] : typeInscription}
        >
          <Text style={selectedItem === items.indexOf(items[choice.id]) ? [styles.textType, styles.textTypeActive] : styles.textType}>{items[choice.id].label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default AppSwitch;

const styles = StyleSheet.create({
  types: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    backgroundColor: colors.blue,
    borderRadius: 6,
  },
  textType: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "700"
  },
  textTypeActive: {
    color: colors.white
  }
})