import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Switch,
  View,
  Image,
  VirtualizedList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import profilPicture from '../../assets/profil_picture.jpg';
import BackgroundPicture from '../../assets/background_image.svg';


import { Card } from '@ui-kitten/components';

const Profil = ({user, onProfilPress}) => {
  const profil = user;
  const [isPermisB, setIsPermisB] = useState(profil.permisB);
  const [isAvailable, setIsAvailable] = useState(profil.isAvailable);
  const toggleSwitchPermisB = () => setIsPermisB(previousState => !previousState);
  const toggleSwitchAvailable = () => setIsAvailable(previousState => !previousState);
  const toggleCloseModalModifProfil = () => {
    setModalVisible(false);
  };
  
  return (
    
    <View>
      <BackgroundPicture style={styles.pictureBackground} />
      <View>
        <Card style={styles.cardImage}>
          <Image source={profilPicture} style={styles.profilePicture}/>
          <Text style={styles.userName}>{profil.firstName} {profil.name}</Text>
        </Card>
      </View>
      <View style={styles.listRow}>
        <Text> Disponible
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isAvailable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchAvailable}
          value={isAvailable}
          style={styles.switchStyles}
        />
      </View>
      <View style={styles.cardInformations}>
        <View style={styles.listRow}>
          <Text style={styles.title}>Vos Informations : 
          </Text>
          <Ionicons name='create-outline' style={styles.editIcons} onPress={() => onProfilPress(user)} ></Ionicons>
        </View>
        <View style={styles.listRow}>
          <Text> Ville : 
          </Text>
          <Text style={styles.infoUser}>{profil.city}</Text>
        </View>
        <View style={styles.listRow}>
          <Text> Adresse : 
          </Text>
          <Text style={styles.infoUser}>{profil.adresse}</Text>
        </View>
        <View style={styles.listRow}>
          <Text> Numéro tel :
          </Text>
          <Text style={styles.infoUser}>{profil.tel}</Text>
        </View>
        <View style={styles.listRow}>
          <Text> Age : 
          </Text>
          <Text style={styles.infoUser}>{profil.age}</Text>
        </View>
        <View style={styles.listRow}>
          <Text> Titulaire du permis B 
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: 'green' }}
            thumbColor={isPermisB ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchPermisB}
            value={isPermisB}
            style={styles.switchStyles}
          />
        </View>
      </View>
      <View style={styles.cardDescription}>
        <Text style={styles.title}>Votre description/CV : 
        </Text>
        <View style={styles.listRow}>
          <Text>
            {profil.etude1}
          </Text>
        </View>
        <View style={styles.listRow}>
          <Text>
            {profil.etude2}
          </Text>
        </View>
        <View style={styles.listRow}>
          <Text>
            {profil.etude3}
          </Text>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    textAlign: 'justify',
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    width:50,
  },
  listRow: {
    flexDirection : 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  pictureBackground: {
    marginLeft:-9,
    position: 'absolute'
  },
  cardImage: {
    zIndex: 1,
    textAlign: 'center',
    width: 250,
    marginHorizontal: 50,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    borderColor: 'black',
    marginTop: 80
    
  },
  userName: {
    textAlign: 'center'
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginHorizontal:50,
    marginBottom: 20,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    borderTopStartRadius:50,
    borderTopEndRadius:50
  },
  infoUser: {
    color: 'rgb(0,121,255)',
  },
  cardInformations: {
    marginTop: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderTopWidth:1,
    paddingTop:0
  },
  cardDescription: {
    marginTop: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderTopWidth:1,
    paddingTop:20
  },
  editIcons:{
    fontSize: 28
  }
});

export default Profil;