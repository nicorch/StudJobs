import * as React from "react";
import { StyleSheet, View, Modal, ScrollView } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from "../Components/AppButton";
import renderType from "../Helpers/renderOffreTypes";


const OffreDetailsModal = ({isVisible,offre,onClosePress}) => {
  return (
  <Modal
    animationType = {"slide"}
    transparent={false}
    presentationStyle="pageSheet"
    visible={isVisible}>
      <View style={[styles.header]}>
        <Text category='h6'>Détail de l'offre</Text>
        <AntDesign name="closecircle" size={16} color="grey" onPress={() => onClosePress()}/>
      </View>
      <ScrollView>
        <View  style={[styles.row]}>
          <Text style={[styles.label]} >Entreprise :</Text> 
          <Text style={[styles.field]}>{offre.entreprise.name}</Text>
        </View>
        <View  style={[styles.row]}>
          <Text style={[styles.label]} >Type :</Text> 
          <Text style={[styles.field]}>{renderType(offre.type)}</Text>
        </View>
        <View  style={[styles.row]}>
          <Text style={[styles.label]} >Localisation :</Text> 
          <Text style={[styles.field]}>{offre.location.city}</Text>
        </View>
        <View  style={[styles.row]}>
          <Text style={[styles.label]} >Rémunération :</Text> 
          <Text style={[styles.field]}>{offre.remuneration.amount} {offre.remuneration.unity}</Text>
        </View>
        <View  style={[styles.row]}>
          <Text style={[styles.label]} >Durée :</Text> 
          <Text style={[styles.field]}>{offre.duration} 
            {(offre.dateDebut || offre.dateFin) || (offre.heureDebut || offre.heureFin) ? '' : <Text style={styles.muted}>(Non détaillé)</Text>}
          </Text>
        </View>
        {(offre.dateDebut || offre.dateFin) || (offre.heureDebut || offre.heureFin) ? 
          <View style={[styles.row_mini]}>
            <Text style={styles.smallText}>{(offre.dateDebut || offre.dateFin) ? (offre.dateDebut ? offre.dateDebut : '??') +' au '+ (offre.dateFin ? offre.dateFin : '??'): ''} </Text>
            <Text style={styles.smallText}>
              {(offre.heureDebut || offre.heureFin) ? ((offre.heureDebut ? offre.heureDebut : '??') +'h' +' à '+ (offre.heureFin ? offre.heureFin : '??') + 'h') : '' }
            </Text>
          </View>
        : <Text></Text>}
        <View  style={[styles.row]}>
          <Text style={[styles.label]} >Intitulé :</Text> 
          <Text style={[styles.field]}>{offre.title}</Text>
        </View>
        <View style={[{marginTop: 5}]}>
          <Text style={[styles.label]} >Description :</Text> 
          <Text style={[styles.longfield]}>{offre.description}</Text>
        </View>
        <View >
          <AppButton 
            title="Postuler" 
            styles={{borderColor: 'blue',borderWidth: 2, padding: 9, alignSelf: 'flex-end', marginHorizontal: 24}}
            color='white'
            colorText='blue'
            icon="email-send"
            // onHandlePress={handleSubmit} 
            />
        </View>
      </ScrollView>

  </Modal>
)};
export default OffreDetailsModal;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  row_mini: {
    flexDirection: 'row',
    marginEnd: 40,
    justifyContent: 'flex-end',
  },
  label: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  field: {
    marginVertical: 10,
    marginEnd: 40,
    overflow: 'hidden'
  },
  longfield: {
    margin: 20,
    overflow: 'scroll'
  },
  smallText: {
    fontSize: 12,
    color: 'grey'
  },
  muted: {
    fontSize: 8,
    color: 'grey'
  }

});