import * as React from "react";
import { StyleSheet, View, Modal, Switch, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Card, Text } from '@ui-kitten/components';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, AntDesign, Ionicons,MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {REACT_APP_GOOGLE_API_KEY} from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

const utc = 1; //handle utc + 1;
const getDate = (date) => {  
  let dater = new Date(date);
  dater.setHours(date.getHours() + utc);
  return dater;}

const dateDefault = new Date('1970-01-01');
dateDefault.setHours(0,0,0,0);

const OffresFiltersModal = ({isVisible,onClosePress, onSavePress }) => {
  Geocoder.init(REACT_APP_GOOGLE_API_KEY);

  const cancelColor = 'lightblue';
  // Field
  const isDefaultDateUTC = (date) => getDate(dateDefault).getTime() == getDate(date).getTime()   
  const [cities, setCities] = React.useState([]);
  const [typeCdi, setCDIisEnabled] = React.useState(false);
  const [typeCdd, setCDDisEnabled] = React.useState(false);
  const [typeInterim, setINTERIMIsEnabled] = React.useState(false);
  const [nbFiltres, setNbFiltres] = React.useState(0);
  const [debutHMin, setDebutHMin] = React.useState(dateDefault);
  const [debutHMax, setDebutHMax] = React.useState(dateDefault);
  const [finHMin, setFinHMin] = React.useState(dateDefault);
  const [finHMax, setFinHMax] = React.useState(dateDefault);
  const [dateDebut, setDateDebut] = React.useState(new Date());
  const [pickerDebutVis, setPickerDebutVis] = React.useState(false);
  const [dateFin, setDateFin] = React.useState(new Date());
  const [pickerFinVis, setPickerFinVis] = React.useState(false);
  const [isReset, setReset] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  const refGoogleInput = React.useRef();
  
  const filterDefault = {
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
  };
  const [filtersData, setFilters] = React.useState(null);

  React.useEffect(async () => {
    try {
      var data = await AsyncStorage.getItem('filters');
      if (data) {
        var json = JSON.parse(data);
        setCities(json.city);
        if (json.horaires) {
          for (const key in json.horaires) {
            switch (key) {
              case 'dMin':
                setDebutHMin(new Date(json.horaires.dMin||debutHMin));
                break;
              case 'dMax':
                setDebutHMax(new Date(json.horaires.dMax||debutHMax));
                break;
              case 'fMin':
                setFinHMin(new Date(json.horaires.fMin||debutHMin));
                break;
              case 'fMax':
                setFinHMax(new Date(json.horaires.fMax||debutHMin));
                break;
              default:
                break;
            }
          }
        }
        if (json.date) { 
          if (json.date.debut) {
            setDateDebut(new Date(json.date.debut));
            setPickerDebutVis(true);
          } else  setPickerDebutVis(false);
          if (json.date.fin) {
            setDateDebut(new Date(json.date.fin));
            setPickerFinVis(true);
          } else  setPickerFinVis(false);
        }
        if (json.typeOffre) {
          var types = json.typeOffre
          for (const key in types) {
            switch (key) {
              case 'cdd':
                setCDDisEnabled(types.cdd||typeCdd);
                break;
              case 'cdi':
                setCDIisEnabled(types.cdi||typeCdi);
                break;
              case 'interim':
                setINTERIMIsEnabled(types.interim||typeInterim);
                break;
              default:
                break;
            }
          }
        }
        setNbFiltres(json.nbFiltres||0);
      } else setFilters(filterDefault)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, city: cities, nbFiltres: nbFiltres}));
  }, [cities]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMin: isDefaultDateUTC(debutHMin) ? null : debutHMin}}));
  }, [debutHMin]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMax: isDefaultDateUTC(debutHMax) ? null : debutHMax}}));
  }, [debutHMax]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMin: isDefaultDateUTC(finHMin) ? null : finHMin}}));
  }, [finHMin]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMax: isDefaultDateUTC(finHMax) ? null : finHMax}}));
  }, [finHMax]);
  React.useEffect(() => {
    pickerDebutVis && setFilters((prevState) => ({...prevState, date: {...prevState.date,debut: dateDebut}}));
  }, [dateDebut]);
  React.useEffect(() => {
    pickerFinVis && setFilters((prevState) => ({...prevState, date: {...prevState.date,fin: dateFin}}));
  }, [dateFin]);
  React.useEffect(() => {
    setFilters((prevState) => ({...prevState, typeOffre: {cdd: typeCdd, cdi: typeCdi, interim: typeInterim}}));
  }, [typeCdi,typeCdd,typeInterim]);
  React.useEffect(() => {
    if (nbFiltres >= 0) {
      setFilters((prevState) => ({...prevState, nbFiltres: nbFiltres}));
    } else setNbFiltres(0);
  }, [nbFiltres]);
  
  React.useEffect(async () => {
    try {
      await AsyncStorage.setItem('filters', JSON.stringify(filtersData));
    } catch (error) {
      console.log(
        error
      );
    }
  }, [filtersData]);
  
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

  const handleSave = async () => {
    onSavePress();
    setReset(false);
  }
  

  const resetFilters = async () => {
    setCities([])
    setCDIisEnabled(false)
    setCDDisEnabled(false)
    setINTERIMIsEnabled(false)
    setNbFiltres(0);
    setFinHMax(dateDefault);
    setFinHMin(dateDefault);
    setDebutHMin(dateDefault);
    setDebutHMax(dateDefault);
    setDateDebut(new Date());
    setDateFin(new Date());
    setPickerDebutVis(false)
    setPickerFinVis(false)
    setReset(true);
    try {
      await AsyncStorage.setItem('filters', null);
    } catch (error) {
        // Error saving data
    }
  }

  return (
    !loading && 
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
                  {cities&&cities.map((l, i) => (
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
                        value={typeCdd}
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
                      value={typeCdi}
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
                      <Text style={styles.labelField}>Heure - Début min</Text>
                      <RNDateTimePicker
                        testID="dateTimePickerDebut"
                        value={debutHMin}
                        mode={'time'}
                        display="compact"
                        onChange={(event, update) => {
                          if (!update || update.getHours() == 0) { 
                            setDebutHMin(dateDefault);
                            return} 
                            if (!filtersData.horaires.dMin) setNbFiltres(nbFiltres+1);
                            const now = new Date();
                            now.setHours(update.getHours())
                            now.setMinutes(0);
                            setDebutHMin(now);
                        }}
                        is24Hour={true}
                        style={styles.picker}
                      />
                      {filtersData.horaires.dMin && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} 
                      onPress={() => {
                        setDebutHMin(dateDefault);
                        setNbFiltres(nbFiltres-1);
                        // setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMin: null}}));
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
                            setDebutHMax(dateDefault);
                            return} 
                            if (!filtersData.horaires.dMax) setNbFiltres(nbFiltres+1);
                            const now = new Date();
                            now.setHours(update.getHours())
                            now.setMinutes(0);
                            setDebutHMax(now);
                        }}
                        is24Hour={true}
                        style={styles.picker}
                      />
                      {filtersData.horaires&&filtersData.horaires.dMax && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} 
                      onPress={() => {
                        setDebutHMax(dateDefault);
                        setNbFiltres(nbFiltres-1);
                        // setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,dMax: null}}));
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
                            setFinHMin(getDate(dateDefault));
                            return} 
                            if (!filtersData.horaires.fMin) setNbFiltres(nbFiltres+1);
                            const now = new Date();
                            now.setHours(update.getHours())
                            now.setMinutes(0);
                            setFinHMin(now);
                            // setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMin: update.getHours()}}));
                        }}
                        is24Hour={true}
                        style={styles.picker}
                      />
                      {filtersData.horaires&&filtersData.horaires.fMin && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                        setFinHMin(dateDefault);
                        setNbFiltres(nbFiltres-1);
                        // setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMin: null}}));
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
                          setFinHMax(getDate(dateDefault));
                          return}
                          if (!filtersData.horaires.fMax) setNbFiltres(nbFiltres+1);
                          const now = new Date();
                          now.setHours(update.getHours())
                          now.setMinutes(0);
                          setFinHMax(now);
                          // setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMax: update.getHours()}}));
                        }}
                        is24Hour={true}
                        style={styles.picker}
                      />
                        {filtersData.horaires&&filtersData.horaires.fMax && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
                          setFinHMax(dateDefault);
                          setNbFiltres(nbFiltres-1);
                          // setFilters((prevState) => ({...prevState, horaires: {...prevState.horaires,fMax: null}}));
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
                      {pickerDebutVis && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
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
                      {pickerFinVis && <AntDesign name="closecircle" style={styles.cancel} size={16} color={cancelColor} onPress={() => {
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