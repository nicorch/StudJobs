import React from "react";
import { SearchBar, Badge, withBadge } from 'react-native-elements';
import { ActivityIndicator, StyleSheet, ScrollView, View } from "react-native";
import Offres from "./Offres";
import AsyncStorage from '@react-native-async-storage/async-storage';

import OffreDetailsModal from "./OffreDetailsModal";
import OffresFiltersModal from "./OffresFiltersModal";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

const offreTemplateObject = {
  _id: '00',
  type: 'none',
  entreprise: {
    name: 'none',
    avatar: '00'
  },
  location: {
    city: ''
  },
  title: 'none',
  description: 'none',
  duration: 'none',
  dateDebut: null,
  dateFin: null,
  heureDebut: null,
  heureFin: null,
  remuneration: {
    amount: 0,
    unity: '€/h'
  }
}

const OffresScreen = ({ data, loading, setData, setFilters }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisibleFilters, setFiltersVisible] = React.useState(false);
  const [offreOpened, setOffreOpened] = React.useState(offreTemplateObject);
  const [nbFilters, setNbFilters] = React.useState(0);
  const [search,setSearch] = React.useState(null);
  const [filters,setFiltersModal] = React.useState(null);

  const toggleOffreHandler = (offreId) => {
    const newData = data.map((offre) => {
      if (offre._id === offreId) {
        setOffreOpened(offre);
        setModalVisible(true);
        return { ...offre };
      } else {
        return offre;
      }
    });
    setData(newData);
  };
  const toggleOpenFilterHandler = () => {
    setFiltersVisible(true);
  };
  const toggleCloseFilterHandler = () => {
    setFiltersVisible(false);
  };
  const toggleSaveFilterHandler = async () => {
    try {
      let filtres = await AsyncStorage.getItem('filters');
      if (filtres) {
        filtres = JSON.parse(filtres);
        setFilters({...filtres, search: search});
        setNbFilters(filtres.nbFiltres);
      }
      setFiltersVisible(false);
    } catch (error) {
      console.log(error);      
    }
  };
  const toggleCloseOffreHandler = () => {
    setModalVisible(false);
  };

  const updateSearch = (search) => {
    if (search && search.length >= 2) {
      setSearch(search);
    } else setSearch(null);
  };

  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, search: search}));
  },[search])

  const FilterIcon = (<MaterialCommunityIcons name={nbFilters ? 'filter-remove' : 'filter'} size={24} color="black" style={styles.filter_btn} onPress={toggleOpenFilterHandler}/>);
  const BadgedIcon = withBadge(nbFilters,{left: 0,top: 2})(() => FilterIcon);

  return (
    <View>
      <View style={styles.row_seacrh}>
        <SearchBar
          placeholder="Rechercher"
          onChangeText={updateSearch}
          onCancel={updateSearch}
          onClear={updateSearch}
          round={true}
          // showLoading={true}
          platform="ios"
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          showCancel={false}
          cancelButtonProps={{buttonStyle: {display: 'none'}}}
          />
          { nbFilters ? <BadgedIcon /> : FilterIcon }
          </View> 
      {(loading) ? (
        <ActivityIndicator />
      ) : (
        <View>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Offres offres={data} onOffrePress={toggleOffreHandler} />
            <OffreDetailsModal isVisible={isModalVisible} offre={offreOpened} onClosePress={toggleCloseOffreHandler}/>
          </ScrollView>
          <OffresFiltersModal 
            isVisible={isModalVisibleFilters}  
            onClosePress={toggleCloseFilterHandler}
            onSavePress={toggleSaveFilterHandler}
          />
        </View>
      )}
    </View>
  );
};

export default OffresScreen;

const styles = StyleSheet.create({
  searchContainer: {
    height: 50
  },
  searchInputContainer: {
    height: 40,
    left: 55,
    marginEnd: 55,
  },
  row_seacrh: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  filter_btn: {
    padding: 13,
    paddingEnd: 15,
    backgroundColor: 'white'
  },
  
});
