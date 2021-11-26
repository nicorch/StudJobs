import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Moment from 'moment';

const Header = (offre) => {
  Moment.locale('fr');
    return (
  <View >
    <Text category='h6'>{offre.entreprise.name}</Text>
    <View style={[styles.topContainer]}>
        <Text category='s1'>{offre.title}</Text>
        <Text category='s1'>{offre.remuneration.amount} {offre.remuneration.unity} </Text>
    </View>
  </View>
)};

const formatDate = (milli) => {
  return new Date(milli * 1000).getHours().toString();
}

const Footer = (offre,onPress) => {
  return (
  <View>
      <View style={[styles.footerContainer]}>
        <Text>Durée: {offre.duration} | {(offre.heureDebut) ?  formatDate(offre.heureDebut._seconds) +'h' : '??h'}-{(offre.heureFin)? formatDate(offre.heureFin._seconds)+'h' : '??h'}</Text>
        <AntDesign name="infocirlceo" size={16} color="blue" onPress={() => onPress(offre._id)}/>
      </View>
  </View>
)
}


const Offre = ({ offre, onPress }) => (
    <Card styles={[styles.card]} header={Header(offre)} footer={Footer(offre,onPress)}>
      <Text>
        {offre.description}
      </Text>
    </Card>
  );

export default Offre;

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