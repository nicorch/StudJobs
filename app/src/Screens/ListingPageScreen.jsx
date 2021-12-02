import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import colors from '../config/colors';
import Screen from '../Components/Screen';
import Card from "./../Components/Card"
import listingsApi from '../api/listings';
import listingsCategories from '../api/categories';
import useApi from "./../hooks/useApi"
import ActivityIndicator from './../Components/ActivityIndicator';
import AppText from '../Components/AppText';
import AppButton from '../Components/AppButton';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppForm from "./../Components/forms/AppForm"
import AppFormField from "./../Components/forms/AppFormField"
import SubmitButton from "./../Components/forms/SubmitButton"

import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  location: Yup.string().min(1).label("Ville"),
  price: Yup.number().min(1).max(10000).label("Price").nullable(),
});


function ListingPageScreen({ navigation }) {

  const getListingsApi = useApi(listingsApi.getListings)
  const getCategoriesApi = useApi(listingsCategories.getCategories)

  const [listings, setListings] = useState([])
  const [filterActive, setFilterActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)

  const getAllListings = () => {
    getListingsApi.request()
    setListings(getListingsApi.data)
  }

  useEffect(() => {
    getAllListings()
    getCategoriesApi.request()
  }, [])

  const handleSubmit = ({ location, price }) => {
    setListings(getListingsApi.data)
    let data = getListingsApi.data;
    let newListings = [];

    if (location !== "") {
      newListings = data.filter(l => l.location === location)
      setListings(newListings)
    }

    if (location === "") {
      setListings(getListingsApi.data)
    }

    if (price) {
      newListings = listings.filter(l => (l.price >= (price - 1)) && (l.price <= (price + 1)))
      //newListings = listings.filter(l => l.price === price)
      setListings(newListings)
    }

    setModalActive(false)
    setFilterActive(true)
  }

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error &&
          <>
            <AppText>Error</AppText>
            <AppButton title="Réessayer" onPress={getListingsApi.request} />
          </>
        }
        <View style={styles.bar}>
          <TouchableOpacity style={styles.buttonsTop} onPress={() => { setModalActive(true) }}>
            <MaterialCommunityIcons name="filter" size={27} color={colors.white} />
            <Text style={{ fontSize: 16, color: "white" }}>Filtres</Text>
          </TouchableOpacity>
          {filterActive && (
            <TouchableOpacity style={styles.buttonsTop} onPress={() => { setFilterActive(false) }} >
              <MaterialCommunityIcons name="filter-remove" size={27} color={colors.white} />
              <Text style={{ fontSize: 16, color: "white" }}>Annuler</Text>
            </TouchableOpacity>
          )
          }
          <TouchableOpacity style={styles.buttonsTop} onPress={getAllListings}>
            <MaterialCommunityIcons name="refresh" size={27} color={colors.white} />
            <Text style={{ fontSize: 16, color: "white" }}>Actualiser</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filterActive ? listings : getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={item.price + " €/h"}
              imageUrl={item.images[0].url}
              type={item.type}
              entreprise={item.entreprise}
              category={getCategoriesApi.data.filter((i) => (i.id.toString() === item.categoryId.toString()))[0]}
              onPress={() => navigation.navigate("ListingDetails", item)}
            />
          )}
        />
      </Screen>
      <Modal visible={modalActive} animationType="slide">
        <Screen>
          <Button title="Fermer" onPress={() => setModalActive(false)} />
          <View style={{ paddingHorizontal: 20 }}>
            <AppForm
              initialValues={{
                location: "",
                price: null
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppFormField style={{ borderColor: colors.violet }} maxLength={255} name="location" placeholder="Localisation" />
              <AppFormField style={{ borderColor: colors.violet }} maxLength={8} keyboardType="numeric" name="price" placeholder="Rémuniration (+- 1€)" />
              <SubmitButton title="Valider" />
            </AppForm>
          </View>
        </Screen>
      </Modal>
    </>
  );
}

export default ListingPageScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15
  },
  buttonsTop: { width: "32%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: colors.blue, paddingVertical: 5, borderRadius: 10 }
})