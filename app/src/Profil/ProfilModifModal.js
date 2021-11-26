import { Button, Text, } from '@ui-kitten/components';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Modal,
  Switch,
  View,
  Image,
  VirtualizedList,
  TextInput
} from 'react-native';
import Profil from './Profil';


const ProfilModifModal = ({isProfilVisible, user, onCloseProfilPress}) => {
    return (
        <Modal
          animationType = {"slide"}
          transparent = {false}
          presentationStyle = "pageSheet"
          visible = {isProfilVisible}>
          <View style={[styles.header]}>
            <Text category='h6'>Modifier le profil </Text>
          </View>
          <View >
            <Text>Ville : </Text>
            <TextInput>
              {user.ville}
            </TextInput>
          </View>
          <View >
            <Text>Adresse : </Text>
            <TextInput>
              {user.adresse}
            </TextInput>
          </View>
          <View >
            <Text>Numéro tel : </Text>
            <TextInput>
              {user.tel}
            </TextInput>
          </View>
          <View >
            <Text>Né le : </Text>
            <TextInput>
              {user.dateNaissance}
            </TextInput>
          </View>
          <Button onPress={() => onCloseProfilPress()}></Button>
        </Modal>
    )
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
    header: {
      paddingVertical: 24,
      paddingHorizontal: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: 'grey',
      borderBottomWidth: 0.25,
      textAlign: 'center'
    },
});

export default ProfilModifModal;