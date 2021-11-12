import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Offres from "./Offres";
import OffreDetailsModal from "./OffreDetailsModal";

const OffresScreen = ({ data, loading, setData }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [offreOpened, setOffreOpened] = React.useState({
    _id: '00',
    type: 'none',
    entreprise: {
      name: 'none',
      avatar: '00'
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
  });

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
  const toggleCloseOffreHandler = (offreId) => {
    setModalVisible(false);
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Offres offres={data} onOffrePress={toggleOffreHandler} />
          <OffreDetailsModal isVisible={isModalVisible} offre={offreOpened} onClosePress={toggleCloseOffreHandler}/>
        </ScrollView>
      )}
    </View>
  );
};

export default OffresScreen;
