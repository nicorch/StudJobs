import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import AppForm from "./../Components/forms/AppForm"
import AppFormField from "./../Components/forms/AppFormField"
import AppFormPicker from "./../Components/forms/AppFormPicker"
import SubmitButton from "./../Components/forms/SubmitButton"
import AppSwitch from '../Components/AppSwitch';
import CategoryPickerItem from "../Components/CategoryPickerItem";
import Screen from "../Components/Screen";
import FormImagePicker from "../Components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import UploadScreen from "./UmploadScreen";
import formik from "formik";


const choices = [{ id: 0, label: "CDD" }, { id: 1, label: "CDI" }, { id: 2, label: "Intérim" }]

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
  entreprise: Yup.string().required().min(1).label("Entreprise"),
  location: Yup.string().required().min(1).label("Ville"),
  type: Yup.string().label("Type contrat")
});

const categories = [
  {
    id: 1,
    name: "Baby-sitter",
    icon: "mother-nurse",
    backgroundColor: "#fc5c65",
    color: "white"
  },
  {
    id: 2,
    name: "Serveur / Serveuse",
    icon: "bottle-wine",
    backgroundColor: "#fd9644",
    color: "white"
  },
  {
    id: 3,
    name: "Soutien scolaire",
    icon: "school",
    backgroundColor: "#fed330",
    color: "white"
  },
  {
    id: 4,
    name: "Livreur",
    icon: "moped",
    backgroundColor: "#26de81",
    color: "white"
  },
  {
    id: 5,
    name: "Hôte(sse) d'accueil",
    icon: "human-greeting",
    backgroundColor: "#2bcbba",
    color: "white"
  },
  {
    id: 6,
    name: "Enquêteur",
    icon: "account-search",
    backgroundColor: "#45aaf2",
    color: "white"
  },
  {
    id: 7,
    name: "Distributeur",
    icon: "newspaper-variant-multiple",
    backgroundColor: "#4b7bec",
    color: "white"
  },
  {
    id: 8,
    name: "Vendeur",
    icon: "account-tie-voice",
    backgroundColor: "#a55eea",
    color: "white"
  },
  {
    id: 9,
    name: "Restauration",
    icon: "food",
    backgroundColor: "#FCBCB8",
    color: "white"
  },
  {
    id: 10,
    name: "Polyvalent",
    icon: "account-multiple",
    backgroundColor: "#216869",
    color: "white"
  },
  {
    id: 11,
    name: "Autre",
    icon: "dots-horizontal",
    backgroundColor: "#778ca3",
    color: "white"
  }
];

function ListingEditScreen({ navigation }) {

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm, }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      listing,
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm({ values: "" })

    navigation.navigate("Listing")

  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
        <AppForm
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
            entreprise: "",
            location: "",
            type: "CDD"
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <AppFormField maxLength={255} name="title" placeholder="Title" />
          <AppSwitch style={{ width: "50%" }} items={choices} name="type" />
          <AppFormField
            name="price"
            keyboardType="numeric"
            maxLength={8}
            placeholder="Price"
            width={120}
          />
          <AppFormPicker
            name="category"
            items={categories}
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
          />
          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <AppFormField maxLength={255} name="entreprise" placeholder="Entreprise" />
          <AppFormField maxLength={255} name="location" placeholder="Localisation" />
          <SubmitButton title="Valider" />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
