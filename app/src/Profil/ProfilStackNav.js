import * as React from 'react';
import ProfilScreen from "./ProfilScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const ProfilStack = createNativeStackNavigator();


const ProfilStackNav = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const [isPermisB, setIsPermisB] = React.useState();
    const [isAvailable, setIsAvailable] = React.useState()
    
    const fetchData = () => {
      return (
        {
          lastName: "Bidaud",
          firstName: "Antoine",
          city: "Bordeaux",
          age: "23",
          phone: "0631550378",
          adresse: "25 rue Fernand Belliard",
          isPermis: true,
          isAvailable: true,
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

        setUser(serverData);
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

    const updatePermis = (data) => {
      setIsPermisB(data);
    }

    const updateAvailable = (data) => {
      console.log(data);
      setIsAvailable(data);
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
            setPermis={updatePermis}
            setAvailable={updateAvailable}
          />
        )}

        </ProfilStack.Screen>
        
    </ProfilStack.Navigator>
  );
}

  export default ProfilStackNav;