import * as React from "react";
import Offre from "./Offre";
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

const Offres = ({ offres, onOffrePress }) => {
  return offres ? (
    offres.map((offre) => (
      <View style={styles.card}>
        <View style={styles.cardContainer}>
          <Offre offre={offre} onPress={onOffrePress} />
        </View>
      </View>
    ))) : (
    <Card styles={[styles.card]}>
      <Text>
        Aucune offre disponible
      </Text>
    </Card>)
};

export default Offres;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden'
  },
  card: {
    marginBottom: 18,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,

    // elevation: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});