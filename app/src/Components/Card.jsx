import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import AppText from "./AppText";
import colors from '../config/colors';
import { MaterialCommunityIcons } from "@expo/vector-icons"

function Card({ title, subTitle, type, entreprise, imageUrl, onPress, category }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          tint="light"
          resizeMode="cover"
          source={{ uri: imageUrl }}
        >
          {category&&<View style={{...styles.categoryIcon, backgroundColor: category.backgroundColor}}>
            <MaterialCommunityIcons name={category.icon} size={20} color={colors.black} />
          </View>}
        </ImageBackground>
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
  categoryIcon: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    width: 40, 
    height: 40, 
    borderBottomStartRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
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
    color: colors.violet,
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