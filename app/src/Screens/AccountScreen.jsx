import React from 'react';
import Screen from '../Components/Screen';
import ListItem from '../Components/lists/ListItem';
import { View, StyleSheet, FlatList } from 'react-native';
import colors from './../config/colors';
import Icon from '../Components/Icon';
import ListItemSeperator from '../Components/lists/ListItemSeparator';
import useAuth from "./../hooks/useAuth";

const menuItems = [
  {
    id: 1,
    title: "Offres enregistrées",
    icon: {
      name: "format-list-bulleted",
      bgColor: colors.blue
    },
    routeName: "Listing"
  },
  {
    id: 2,
    title: "Mes Messages",
    icon: {
      name: "email",
      bgColor: colors.blue
    },
    routeName: "Messages"
  }
]

function AccountScreen({ navigation }) {

  const { user, logOut } = useAuth();


  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.firstName + " " + user.lastName}
          subTitle={user.email}
          image={require("./../../assets/profil.png")}
          onPress={() => navigation.navigate("Profil")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.id}
          renderItem={({ item }) =>
            <ListItem
              title={item.title}
              onPress={() => navigation.navigate(item.routeName)}
              IconComponent={<Icon name={item.icon.name} bgColor={item.icon.bgColor} />}
            />
          }
          ItemSeparatorComponent={ListItemSeperator}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" bgColor={colors.danger} />}
      />
    </Screen>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light
  },
  container: {
    marginVertical: 20
  }
})