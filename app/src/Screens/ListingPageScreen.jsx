import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import colors from '../config/colors';
import Screen from '../Components/Screen';
import Card from "./../Components/Card"
import listingsApi from '../api/listings';
import listingsCategories from '../api/categories';
import useApi from "./../hooks/useApi"
import ActivityIndicator from './../Components/ActivityIndicator';
import AppText from '../Components/AppText';
import AppButton from '../Components/AppButton';

//const wait = (timeout) => return new Promise(resolve => setTimeout(resolve, timeout));

function ListingPageScreen({ navigation }) {

  const getListingsApi = useApi(listingsApi.getListings)
  const getCategoriesApi = useApi(listingsCategories.getCategories)

  const [listings, setListings] = useState([])
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

  useEffect(() => {
    getListingsApi.request()
    setListings(getListingsApi.data)
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
        <FlatList
          data={getListingsApi.data}
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
})