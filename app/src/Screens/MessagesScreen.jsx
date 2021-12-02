import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../Components/Screen"
import ListItem from "../Components/lists/ListItem";
import ListItemSeparator from "../Components/lists/ListItemSeparator";


const initialMessages = [
  {
    id: 1,
    title: "Nico ",
    description: "Je suis interessé par cet offre",
    image: require("./../../assets/profil.png"),
  },
  {
    id: 2,
    title: "Antoine",
    description: "Bonjour, Proposez-vous d'autres jobs ? ",
    image: require("./../../assets/profil.png"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
