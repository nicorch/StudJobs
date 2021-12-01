import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import colors from '../config/colors';
import Screen from '../Components/Screen';
import Card from "./../Components/Card"
import listingsApi from '../api/listings';
import useApi from "./../hooks/useApi"
import ActivityIndicator from './../Components/ActivityIndicator';
import AppText from '../Components/AppText';
import AppButton from '../Components/AppButton';

function ListingPageScreen(props) {

  const getListingsApi = useApi(listingsApi.getListings)

  useEffect(() => {
    getListingsApi.request()
    console.log(getListingsApi.data)
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
            //onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            //thumbnailUrl={item.images[0].thumbnailUrl}
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