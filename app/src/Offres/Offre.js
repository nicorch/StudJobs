import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import renderType from "../Helpers/renderOffreTypes";
import Moment from 'moment';

const Header = (offre) => {
  Moment.locale('fr');
    return (
  <View >
    <View style={[styles.topContainer]}>
      <View style={[{justifyContent: 'center'}]}>
        <Text category='h6'>{offre.entreprise.name}</Text>
        <Text category='s1'>{offre.title}</Text>
        <Text category='s1' style={[{color: 'blue'}]}>{offre.location.city} </Text>
      </View>
      <View style={[{justifyContent: 'center', alignItems: 'flex-end'}]}>
        <Text category='s1'>{offre.remuneration.amount} {offre.remuneration.unity} </Text>
        <Text category='s2'>{renderType(offre.type)}</Text>
      </View>
    </View>
  </View>
)};

const formatDate = (milli) => {
  return new Date(milli * 1000).getHours().toString();
}

const Footer = (offre,onPress) => {
  return (
  <View>
      <View style={styles.footerContainer}>
        <View style={[{justifyContent: 'center'}]}>
          <Text>Durée: {offre.duration} | {(offre.heureDebut) ?  formatDate(offre.heureDebut._seconds) +'h' : '??h'}-{(offre.heureFin)? formatDate(offre.heureFin._seconds)+'h' : '??h'}</Text>
        </View>
        <View style={[styles.footerContainer]}>
          <MaterialCommunityIcons name="email-send-outline"  color="blue" size={16} style={styles.iconButton} onPress={() => {}} />
          <MaterialCommunityIcons name="eye-outline"  color="blue" size={16} style={styles.iconButton} onPress={() => onPress(offre._id)} />
        </View>
      </View>
  </View>
)
}


const Offre = ({ offre, onPress }) => (
  <View styles={[styles.card]}>
    <Card header={Header(offre)} footer={Footer(offre,onPress)}>
      <Text>
        {offre.description}
      </Text>
    </Card>
  </View>
  );

export default Offre;

const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconButton: {
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: "blue",
      borderRadius: 10,
      padding: 5
    },
    card: {
      flex: 1,
      margin: 20,
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
      paddingHorizontal: 0,
      paddingVertical: 0
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });