import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Offres from "./Offres";

const OffresScreen = ({ data, loading, setData }) => {
  const toggleOffreHandler = (offreId) => {
    const newData = data.map((offre) => {
      if (offre._id === offreId) {
        console.log('clicked',offre._id);
        return { ...offre };
      } else {
        return offre;
      }
    });
    setData(newData);
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Offres offres={data} onOffrePress={toggleOffreHandler} />
        </ScrollView>
      )}
    </View>
  );
};

export default OffresScreen;
