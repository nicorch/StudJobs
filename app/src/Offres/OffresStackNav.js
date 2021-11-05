import * as React from 'react';
import OffresScreen from "./OffresScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const OffresStack = createNativeStackNavigator();


const OffresStackNav = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    const fetchData = () => {
      return [
        {
          _id: '1',
          type: 'Intérim',
          entreprise: {
            name: 'Engie',
            avatar: ''
          },
          title: 'Prospection de contrats',
          description: 'Prospections de contrats auprès de particuliers. Une journée débute avec un briefing à partir de 9h30 pour les objectifs de la journée. \nVous serez en mission de 11h à 14h30, s\'en suivra la pose déjeuner afin de reprendre de 16h30 à 20h',
          duration: '5 j',
          dateDebut: null,
          dateFin: null,
          heureDebut: null,
          heureFin: null,
          remuneration: {
            amount: 12,
            unity: '€/h'
          }
        },
        {
          _id: '2',
          type: 'CDD',
          entreprise: {
            name: 'NRJ',
            avatar: ''
          },
          title: 'Distribution de flyers',
          description: 'Distribution de flyers pour NRJ Mobile dans la ville de biarritz, en équipe de 2.',
          duration: '3 j',
          dateDebut: null,
          dateFin: null,
          heureDebut: null,
          heureFin: null,
          remuneration: {
            amount: 12,
            unity: '€/h'
          }
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
      const initialProcessOffres = async () => {
        try {
          fetchAndSetData();
        } catch (err) {
          console.error(err);
        }
      };
      initialProcessOffres();
    }, []);
    
    return (
    <OffresStack.Navigator>
      <OffresStack.Screen
        name="OffresList"
        options={{ title: "Offres Actuelles" }}
      >
      {(props) => (
          <OffresScreen
            {...props}
            data={data}
            loading={loading}
            setData={setData}
          />
        )}

        </OffresStack.Screen>
        
    </OffresStack.Navigator>
  );}

  export default OffresStackNav;