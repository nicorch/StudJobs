import React from "react";
import { Keyboard, View } from "react-native";
import Notifications from "expo-notifications";
import * as Yup from "yup";

import AppForm from "./forms/AppForm"
import AppFormField from "./forms/AppFormField"
import SubmitButton from "./forms/SubmitButton"

import messagesApi from "../api/messages";
import colors from "../config/colors";

function ContactForm({ listing }) {

  const handleSubmit = async (values) => {

    Keyboard.dismiss();
    const result = await messagesApi.send(values.message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message.");
    }

    const content = { title: 'Appli StudJobs' };

    Notifications.scheduleNotificationAsync({ content, trigger: null });

  }

  const initialValues = { message: "" };

  return (
    <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
      <AppForm
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          maxLength={255}
          multiline
          name="message"
          numberOfLines={3}
          placeholder="Message..."
          style={{ borderColor: colors.blue }}
        />
        <SubmitButton style={{ borderColor: colors.black }} title="Envoyer Message" />
      </AppForm>
    </View>

  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactForm;