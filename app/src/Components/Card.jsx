import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import AppText from "./AppText";
import colors from '../config/colors';
import { MaterialCommunityIcons } from "@expo/vector-icons"

function Card({ title, subTitle, type, entreprise, imageUrl, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          tint="light"
          resizeMode="cover"
          source={{ uri: imageUrl }}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.titleAndFav}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            <AppText style={styles.favorite}>
              <MaterialCommunityIcons name="heart-outline" size={20} color={colors.black} />
            </AppText>
          </View>
          <View style={styles.typeAndPrice}>
            <AppText style={styles.type} numberOfLines={1}>
              {type}, Chez {entreprise}
            </AppText>
            <AppText style={styles.price}>
              {subTitle}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  detailsContainer: {
    padding: 15,
  },
  titleAndFav: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  title: {
    flex: 1,
    color: colors.blue,
    fontWeight: "bold",
    marginBottom: 5
  },
  typeAndPrice: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  price: {
    color: colors.danger,
    fontWeight: "bold"
  },
  type: {
    flex: 1,
    fontWeight: "bold",
  }
})