import * as React from 'react';
import ProfilScreen from "./ProfilScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const ProfilStack = createNativeStackNavigator();


const ProfilStackNav = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    const fetchData = () => {
      return [
        {
            _id: '1',
            prenom : 'Antoine',
            nom : 'Bidaud',
            ville: 'Bordeaux',
            adresse : '25 rue Fernand Belliard',
            dateNaissance : '09/04/1998',
            permisB : true
        }
      ]
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
    
    return (
    <ProfilStack.Navigator>
      <ProfilStack.Screen
        name="Profil"
        options={{ title: "Votre Compte" }}
      >
      {(props) => (
          <ProfilScreen
            {...props}
            data={data}
            loading={loading}
            setData={setData}
          />
        )}

        </ProfilStack.Screen>
        
    </ProfilStack.Navigator>
  );
}

  export default ProfilStackNav;