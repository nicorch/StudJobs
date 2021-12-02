import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import ContactForm from '../Components/ContactForm';
import colors from "./../config/colors"
import AppText from "./../Components/AppText"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import ListItem from "./../Components/lists/ListItem";
import usersApi from '../api/users';
import useApi from '../hooks/useApi';


function ListingDetailsPageScreen({ route }) {

  const [userOffre, setUserOffre] = useState({ firstName: "Marc", lastName: "Lyer", companyName: "Catie" })
  const listing = route.params;
  const getUsersApi = useApi(usersApi.getUsers)

  useEffect(() => {
    getUsersApi.request()
    getUsersApi.data.map(u => {
      if (u.id === route.params.userId)
        setUserOffre(u)
    })
  }, [])



  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <Image style={styles.image} source={{ uri: listing.images[0].url }} />
        <View style={styles.detailsContainer} >
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>{listing.price} €/h</AppText>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="file-document-edit" size={22} color={colors.black} />
            <AppText style={styles.type}> {listing.type}, Chez {listing.entreprise}</AppText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="map-marker" size={22} color={colors.black} />
            <AppText style={styles.location}> {listing.location}</AppText>
          </View>
          <AppText style={styles.description}>{listing.description}</AppText>
          <View style={styles.userContainer}>
            <ListItem
              style={{ backgroundColor: colors.medium, borderRadius: 8, padding: 10, paddingHorizontal: 20 }}
              image={require("./../../assets/profil.png")}
              title={userOffre["firstName"] + " " + userOffre["lastName"]}
              subTitle={userOffre["companyName"]}
            />
          </View>
        </View>
        <ContactForm listing={listing} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

//              title={userOffre["firstName"] + " " + userOffre["lastName"]}
//subTitle={userOffre["companyName"]}

export default ListingDetailsPageScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: colors.danger,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.blue
  },
  type: {
    fontSize: 20,
    fontWeight: "500",
  },
  location: {
    fontSize: 18,
    marginBottom: 5
  },
  description: {
    fontSize: 18,
    fontStyle: "italic"
  },
  userContainer: {
    marginVertical: 10,
    marginBottom: 10,
  },
})