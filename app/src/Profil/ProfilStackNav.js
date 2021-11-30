import * as React from 'react';
import ProfilScreen from "./ProfilScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const ProfilStack = createNativeStackNavigator();


const ProfilStackNav = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    
    const fetchData = () => {
      return (
        {
          name: "Bidaud",
          firstName: "Antoine",
          city: "Bordeaux",
          age: "23",
          tel: "0631550378",
          adresse: "25 rue Fernand Belliard"
        }
      )
    }
    // const fetchData = () =>
    //     fetch("https://jsonplaceholder.typicode.com/todos", {
    //       headers: { "Content-Type": "application/json" },
    //     }).then((response) => response.json());
    
    const fetchAndSetData = async () => {
      try {
        const serverData = await fetchData();
        setData(serverData);
        setLoading(false);
        setUser(serverData);
      } catch (err) {
        console.error(err);
      }
    };
    
    React.useEffect(() => {
      const initialProcessProfil = async () => {
        try {
          fetchAndSetData();
        } catch (err) {
          console.error(err);
        }
      };
      initialProcessProfil();
    }, []);
    
    const updateProfil = (data) => {
      setUser(data);
    }

    return (
    <ProfilStack.Navigator>
      <ProfilStack.Screen
        name="Profil"
        options={{ title: "Votre Compte" }}
      >
      {(props) => (
          <ProfilScreen
            {...props}
            user={user}
            loading={loading}
            setData={setData}
            setUser={updateProfil}
          />
        )}

        </ProfilStack.Screen>
        
    </ProfilStack.Navigator>
  );
}

  export default ProfilStackNav;