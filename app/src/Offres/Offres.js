import * as React from "react";
import Offre from "./Offre";
import { StyleSheet  } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

const Offres = ({ offres, onOffrePress }) => {
  return offres ? (
    offres.map((offre) => (
        <Offre offre={offre} onPress={onOffrePress} /> 
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
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});