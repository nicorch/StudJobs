import * as React from "react";
import { StyleSheet, View, Modal, Switch, Button, ScrollView, TextInput, LogBox } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { Card, Layout, Text } from '@ui-kitten/components';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, AntDesign, Ionicons,MaterialIcons,FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY} from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';



const OffresFiltersModal = ({isVisible,onClosePress, onSavePress}) => {
  Geocoder.init(REACT_APP_GOOGLE_API_KEY);

  const cancelColor = 'lightblue';
  // Field
  const dateDefault = new Date().setHours(0,0,0,0)
  const [cities, setCities] = React.useState([]);
  const [typeCdi, setCDIisEnabled] = React.useState(false);
  const [typeCdd, setCDDisEnabled] = React.useState(false);
  const [typeInterim, setINTERIMIsEnabled] = React.useState(false);
  const [nbFiltres, setNbFiltres] = React.useState(0);
  const [debutHMin, setDebutHMin] = React.useState(new Date(dateDefault));
  const [debutHMax, setDebutHMax] = React.useState(new Date(dateDefault));
  const [finHMin, setFinHMin] = React.useState(new Date(dateDefault));
  const [finHMax, setFinHMax] = React.useState(new Date(dateDefault));
  const [dateDebut, setDateDebut] = React.useState(new Date());
  const [pickerDebutVis, setPickerDebutVis] = React.useState(false);
  const [dateFin, setDateFin] = React.useState(new Date());
  const [pickerFinVis, setPickerFinVis] = React.useState(false);
  const [isReset, setReset] = React.useState(false);

  const refGoogleInput = React.useRef();
  
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, city: cities, nbFiltres: nbFiltres}));
  }, [cities]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, nbFiltres: nbFiltres}));
  }, [nbFiltres]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, typeOffre: {cdd: typeCdd, cdi: typeCdi, interim: typeInterim}}));
  }, [typeCdi,typeCdd,typeInterim]);

  const [filtersData, setFilters] = React.useState({
    city: null,
    horaires: {
      dMin: null,
      dMax: null,
      fMin: null,
      fMax: null
    },
    date: {
      debut: null,
      fin: null
    },
    typeOffre: {
      cdd: false,
      cdi: false,
      interim: false
    },
    nbFiltres: 0
  });

  const requestPermissionsOrAddCity = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { latitude , longitude } = location.coords
    Geocoder.from(latitude, longitude)
		.then(json => {
      let city = json.results[0].address_components[2].long_name;
      if (cities.indexOf(city) == -1) {
        setCities([...cities, city])
        setNbFiltres(nbFiltres+1);
        refGoogleInput.current?.setAddressText('')
        refGoogleInput.current?.clear();
      } else {
        refGoogleInput.current?.setAddressText('')
        refGoogleInput.current?.clear();
      }
		})
		.catch(error => console.warn(error));
  };

  const handleSave = () => {
    onSavePress(filtersData);
    setReset(false);
  }
  
  


  const resetFilters = () => {
    setCities([])
    setCDIisEnabled(false)
    setCDDisEnabled(false)
    setINTERIMIsEnabled(false)
    setNbFiltres(0);
    setFinHMax(new Date(dateDefault));
    setFinHMin(new Date(dateDefault));
    setDebutHMin(new Date(dateDefault));
    setDebutHMax(new Date(dateDefault));
    setDateDebut(new Date());
    setPickerDebutVis(false)
    setDateFin(new Date())
    setReset(true);
  }

  return (
  <Modal
    animationType = {"slide"}
    transparent={false}
    presentationStyle="pageSheet"
    visible={isVisible}>
      {/* Header */}
      <View style={[styles.header]}> 
        <AntDesign name="closecircle" size={16} color="grey" onPress={() => {isReset ? handleSave() : onClosePress()}}/>
        <View>
          <Text category='h6' style={[{alignSelf: 'center'}]}>Filtrer les offres</Text>
          <Text category="s1" style={[{alignSelf: 'center'}]}>{nbFiltres == 1 ? '1 filtre séléctionné' : (nbFiltres > 1) ? nbFiltres+' filtres séléctionnés' : '' }</Text>
          {nbFiltres ? <Text category="c2" style={[{alignSelf: 'center',color:'blue', marginTop: 3}]}  onPress={() => resetFilters()}>Effacer les filtres</Text>: <Text style={{width: 0,height:0, margin:0, padding: 0}}></Text>}
        </View>
        <Entypo name="save" size={18} color="black" onPress={() => handleSave()}/>
      </View>
      {/* Body filters */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps={'handled'} nestedScrollEnabled={true}>
          {/* filters Localisation */}
          <Text style={[styles.label]} >Localisation</Text> 
          <View style={[styles.rowCard]}>
            <Card styles={styles.card}>
            <View>
              {cities.map((l, i) => (
                <ListItem key={i} containerStyle={{ marginTop: -20 }}>
                  <ListItem.Content>
                    <ListItem.Subtitle>{l}</ListItem.Subtitle>
                  </ListItem.Content>
                  <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                    setCities(cities.filter((v) => {return v !== l}))
                    setNbFiltres(nbFiltres-1);
                  }}/>
                </ListItem>
              ))}
            </View>
              <GooglePlacesAutocomplete
                  ref={refGoogleInput}
                  disableScroll={true}
                  minLength={3}
                  debounce={200}
                  isRowScrollable={false}
                  placeholder='Ajouter une ville'  
                  textInputProps={{
                    clearButtonMode: 'while-editing',
                    placeholderTextColor: 'grey'
                  }}          
                  renderRightButton={() => ((refGoogleInput.current?.getAddressText().length != 0) &&
                      <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                        refGoogleInput.current?.setAddressText('')
                        refGoogleInput.current?.clear();
                    }}/>)}
                  onPress={(data, details = null) => {
                    let city = details.terms[0].value;
                    if (cities.indexOf(city) == -1) {
                      setCities((prevState) => ([...prevState, city]));
                      setNbFiltres(nbFiltres+1);
                      refGoogleInput.current?.setAddressText('')
                      refGoogleInput.current?.clear();
                    } else {
                      refGoogleInput.current?.setAddressText('')
                      refGoogleInput.current?.clear();
                    }
                  }}
                  query={{
                    key: REACT_APP_GOOGLE_API_KEY,
                    language: 'fr',        
                    components: 'country:fr',
                    types: '(cities)', // default: 'geocode'
                  }}
                  styles={{
                    textInputContainer: {
                    },
                    textInput: {
                      height: 38,
                      borderWidth: 0.5,
                      borderColor: 'grey',
                      color: '#5d5d5d',
                      fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                  }}
              />
              <View style={{   marginHorizontal: 40, alignItems: "center"}}>
                <Text style={{paddingBottom: 5}}>ou</Text>
                <MaterialIcons.Button  name="my-location" backgroundColor="#3b5998" onPress={() => {
                  requestPermissionsOrAddCity();
                }}>Se géolocaliser</MaterialIcons.Button>
              </View>
            </Card>
          </View>
          {/* filters Type */}
          <Text style={[styles.label]} >Type d'offres</Text> 
          <View style={[styles.rowCard]}>
            <Card styles={styles.card}>
              <View style={[styles.row,styles.fieldContainer]}>
                  <Text>CDD</Text>
                  <Switch
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      if (typeCdd === false) setNbFiltres(nbFiltres+1);
                      else if (nbFiltres>0) setNbFiltres(nbFiltres-1);
                      setCDDisEnabled(typeCdd => !typeCdd);
                    }}
                    value={typeCdd}
                    />
                </View>
              <View style={[styles.row,styles.fieldContainer]}>
                <Text>CDI</Text>
                <Switch
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    if (typeCdi === false) setNbFiltres(nbFiltres+1);
                    else if (nbFiltres>0) setNbFiltres(nbFiltres-1);
                    setCDIisEnabled(typeCdi => !typeCdi);
                  }
                }
                value={typeCdi}/>
              </View>
              <View style={[styles.row,styles.fieldContainer]}>
                <Text>Interim</Text>
                <Switch
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    if (typeInterim === false) setNbFiltres(nbFiltres+1);
                    else if (nbFiltres>0) setNbFiltres(nbFiltres-1);
                    setINTERIMIsEnabled(typeInterim => !typeInterim);
                  }}
                  value={typeInterim}
                  />
              </View>
            </Card>
          </View>
          {/* filters horaires */}
          <Text style={[styles.label]} >Horaire de disponibilités</Text> 
          <View style={[styles.rowCard]}>
            <Card styles={styles.card}>
              <View style={styles.fieldContainer}>
                  <Text style={styles.labelField}>Heure - Début min </Text>
                  <RNDateTimePicker
                    testID="dateTimePickerDebut"
                    value={debutHMin}
                    mode={'time'}
                    display="compact"
                    onChange={(event, update) => {
                      if (!update || update.getHours() == 0) { 
                        setDebutHMin(new Date(dateDefault));
                        return} 
                        if (!filtersData.horaires.dMin) setNbFiltres(nbFiltres+1);
                        const now = new Date();
                        now.setHours(update.getHours())
                        now.setMinutes(0);
                        setDebutHMin(now);
                        setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMin: update.getHours()}}));
                    }}
                    is24Hour={true}
                    style={styles.picker}
                  />
                  {filtersData.horaires.dMin && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                    setDebutHMin(new Date(dateDefault));
                    setNbFiltres(nbFiltres-1);
                    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMin: null}}));
                  }}/>}
              </View>
              <View style={styles.fieldContainer}>
                  <Text style={styles.labelField}>Heure - Début max </Text>
                  <RNDateTimePicker
                    testID="dateTimePickerDebutMax"
                    value={debutHMax}
                    mode={'time'}
                    display="compact"
                    onChange={(event, update) => {
                      if (!update || update.getHours() == 0) { 
                        setDebutHMax(new Date(dateDefault));
                        return} 
                        if (!filtersData.horaires.dMax) setNbFiltres(nbFiltres+1);
                        const now = new Date();
                        now.setHours(update.getHours())
                        now.setMinutes(0);
                        setDebutHMax(now);
                        setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMax: update.getHours()}}));
                    }}
                    is24Hour={true}
                    style={styles.picker}
                  />
                  {filtersData.horaires.dMax && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                    setDebutHMax(new Date(dateDefault));
                    setNbFiltres(nbFiltres-1);
                    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMax: null}}));
                  }}/>}
              </View>
              <View style={styles.fieldContainer}>
                  <Text style={styles.labelField}>Heure - Fin min </Text>
                  <RNDateTimePicker
                    testID="dateTimePickerFin"
                    value={finHMin}
                    mode={'time'}
                    display="compact"
                    onChange={(event, update) => {
                      if (!update || update.getHours() == 0) { 
                        setFinHMin(new Date(dateDefault));
                        return} 
                        if (!filtersData.horaires.fMin) setNbFiltres(nbFiltres+1);
                        const now = new Date();
                        now.setHours(update.getHours())
                        now.setMinutes(0);
                        setFinHMin(now);
                        setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMin: update.getHours()}}));
                    }}
                    is24Hour={true}
                    style={styles.picker}
                  />
                  {filtersData.horaires.fMin && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                    setFinHMin(new Date(dateDefault));
                    setNbFiltres(nbFiltres-1);
                    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMin: null}}));
                  }}/>}
              </View>
              <View style={styles.fieldContainer}>
                  <Text style={styles.labelField}>Heure - Fin max </Text>
                  <RNDateTimePicker
                    testID="dateTimePickerFinMax"
                    value={finHMax}
                    mode={'time'}
                    display="compact"
                    onChange={(event, update) => {
                      if (!update || update.getHours() == 0) { 
                      setFinHMax(new Date(dateDefault));
                      return}
                      if (!filtersData.horaires.fMax) setNbFiltres(nbFiltres+1);
                      const now = new Date();
                      now.setHours(update.getHours())
                      now.setMinutes(0);
                      setFinHMax(now);
                      setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMax: update.getHours()}}));
                    }}
                    is24Hour={true}
                    style={styles.picker}
                  />
                    {filtersData.horaires.fMax && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                      setFinHMax(new Date(dateDefault));
                      setNbFiltres(nbFiltres-1);
                      setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMax: null}}));
                    }}/>}
              </View>
            </Card>
          </View>
          {/* filters date dispo */}
          <Text style={[styles.label]} >Dates de disponibilités</Text>
          <View style={[styles.rowCard]}>
            <Card styles={styles.card}>
              <View style={styles.fieldContainer}>
                  <Text style={styles.labelField}>Début</Text>
                  {pickerDebutVis === true ? 
                    <RNDateTimePicker
                    testID="dateTimePicker"
                    value={dateDebut}
                    mode={'date'}
                    display="compact"
                    onChange={(event, update) => {
                      if (!update) { 
                        return}
                        const now = new Date(update.getTime())
                        setDateDebut(now);
                        setFilters((prevState) => ({...prevState, date: {...prevState.date,debut: now}}));
                      }}
                    is24Hour={true}
                    style={styles.picker}
                    /> : <View style={styles.fieldContainer}>
                      <Text style={styles.labelField, {margin: 10}}>∞</Text>
                      <Ionicons name="ios-calendar" size={18} color="blue" style={styles.labelField, {margin: 10}} onPress={() => {
                        setDateDebut(new Date());
                        setFilters((prevState) => ({...prevState, date: {...prevState.date,debut: new Date()}}));
                        setNbFiltres(nbFiltres+1);
                        setPickerDebutVis(true);
                      }}/>
                      </View>}
                  {filtersData.date.debut && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                    setPickerDebutVis(false);
                    setDateDebut(null);
                    setNbFiltres(nbFiltres-1);
                    setFilters((prevState) => ({...prevState, date: {...prevState.date,debut: null}}));
                  }}/>}
              </View>
              <View style={styles.fieldContainer}>
                  <Text style={styles.labelField}>Fin</Text>
                  {pickerFinVis === true ? 
                    <RNDateTimePicker
                    testID="dateTimePicker"
                    value={dateFin}
                    mode={'date'}
                    display="compact"
                    onChange={(event, update) => {
                      if (!update) { 
                        return}
                        const now = new Date(update.getTime())
                        setDateFin(now);
                        setFilters((prevState) => ({...prevState, date: {...prevState.date,fin: now}}));
                      }}
                    is24Hour={true}
                    style={styles.picker}
                    /> : <View style={styles.fieldContainer}>
                      <Text style={styles.labelField, {margin: 10}}>∞</Text>
                      <Ionicons name="ios-calendar" size={18} color="blue" style={styles.labelField, {margin: 10}} onPress={() => {
                        setDateFin(new Date());
                        setFilters((prevState) => ({...prevState, date: {...prevState.date,fin: new Date()}}));
                        setNbFiltres(nbFiltres+1);
                        setPickerFinVis(true);
                      }}/>
                      </View>}
                  {filtersData.date.fin && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                    setPickerFinVis(false);
                    setDateFin(null);
                    setNbFiltres(nbFiltres-1);
                    setFilters((prevState) => ({...prevState, date: {...prevState.date,fin: null}}));
                  }}/>}
              </View>
            </Card>
        </View>
      </ScrollView>
  </Modal>
)};
export default OffresFiltersModal;

const styles = StyleSheet.create({
  header: {
    paddingTop: 24,
    paddingBottom: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25
  },
  rowCard: {
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  row_mini: {
    flexDirection: 'row',
    marginEnd: 40,
    justifyContent: 'flex-end',
  },
  label: {
    margin: 20,
    fontWeight: 'bold',
  },
  fieldContainer: {flexDirection: "row",alignContent: "space-between" },
  labelField: {
    margin: 10,flexBasis: 'auto',flexGrow:1, flexShrink: 0
  },
  longfield: {
    margin: 20,
    overflow: 'scroll'
  },
  smallText: {
    fontSize: 12,
    color: 'grey'
  },
  muted: {
    fontSize: 8,
    color: 'grey'
  },
  picker: {margin: 1,flexBasis: 'auto',flexGrow:1, flexShrink: 0},
  cancel: {margin: 10,flexBasis: "auto",flexGrow:0, flexShrink: 0, },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    padding: 10,

    color:"black"
  },
});