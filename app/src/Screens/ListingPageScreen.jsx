import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import colors from '../config/colors';
import Screen from '../Components/Screen';
import Card from "./../Components/Card"

const listings = [
  {
    id: 1,
    title: "Baby-sitting",
    image: require("./../../assets/babysitting.jpg"),
    price: 10,
    categoryId: 1,
    userId: 1,
    description: "Description Offre 1",
    type: "CDI",
    entreprise: "Mom&Pap",
    location: "Lormont"
  },
  {
    id: 2,
    title: "Inventaire",
    image: require("./../../assets/inventaire.jpg"),
    price: 8,
    categoryId: 2,
    userId: 2,
    description: "Description Offre 2",
    type: "CDD",
    entreprise: "Carrefour",
    location: "Bordeaux"
  },
  {
    id: 3,
    title: "Soutien scolaire",
    image: require("./../../assets/soutien_scolaire.jpg"),
    price: 12,
    categoryId: 5,
    userId: 2,
    description: "Description Offre 3",
    type: "Intérim",
    entreprise: "Association help study",
    location: "Pessac"
  }
];

function ListingPageScreen(props) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.price + " €/h"}
            imageUrl={item.image}
            type={item.type}
            entreprise={item.entreprise}
          //onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          //thumbnailUrl={item.images[0].thumbnailUrl}
          />
        )}
      />
    </Screen>
  );
}

export default ListingPageScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
})