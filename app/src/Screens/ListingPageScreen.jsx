import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
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

//const wait = (timeout) => return new Promise(resolve => setTimeout(resolve, timeout));

function ListingPageScreen({ navigation }) {

  const getListingsApi = useApi(listingsApi.getListings)
  const getCategoriesApi = useApi(listingsCategories.getCategories)

  const [listings, setListings] = useState([])
  const [filterActive, setFilterActive] = useState(false)
  //const [refreshing, setRefreshing] = useState(false);

  /*const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListingsApi.request()
    setListings(getListingsApi.data)
    wait(2000).then(() => setRefreshing(false));
  }, []);
  
        <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

  */

  const getAllListings = () => {
    getListingsApi.request()
    setListings(getListingsApi.data)
  }

  useEffect(() => {
    getAllListings()
    getCategoriesApi.request()
  }, [])

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />

      <Screen style={styles.screen}>
        {getListingsApi.error &&
          <>
            <AppText></AppText>
            <AppButton title="Réessayer" onPress={getListingsApi.request} />
          </>
        }
        <View style={styles.bar}>
          <TouchableOpacity style={styles.buttonsTop} onPress={() => { setFilterActive(true); console.log(filterActive) }}>
            <MaterialCommunityIcons name="filter" size={27} color={colors.white} />
            <Text style={{ fontSize: 16, color: "white" }}>Filtres</Text>
          </TouchableOpacity>
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
  buttonsTop: { width: "34%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: colors.blue, paddingVertical: 10, borderRadius: 10 }
})