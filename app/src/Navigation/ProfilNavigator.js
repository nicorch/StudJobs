import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from '../Profil/ProfilScreen';
import useAuth from "./../hooks/useAuth"


const Stack = createNativeStackNavigator();


const ProfilNavigator = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchData = () => {
        return (
            {
                _id: '1',
                prenom: 'Antoine',
                nom: 'Bidaud',
                ville: 'Bordeaux',
                adresse: '25 rue Fernand Belliard',
                dateNaissance: '09 / 04 / 1998',
                permisB: true,
                tel: "06 31 55 03 78",
                isAvailable: true,
                etude1: 'Master 1 Concepteur développpeur d\'application - 2020',
                etude2: 'BTS SIO option Slam - 2018',
                etude3: 'BAC S option Physique-Chimie - 2015'
            }
        )
    }
    // const fetchData = () =>
    //     fetch("https://jsonplaceholder.typicode.com/todos", {
    //       headers: { "Content-Type": "application/json" },
    //     }).then((response) => response.json());

    /*
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

    */

    const { user } = useAuth()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profil"
                options={{ title: "Votre Compte" }}
            >
                {(props) => (
                    <ProfilScreen
                        {...props}
                        user={user}
                    //loading={loading}
                    //setData={setData}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default ProfilNavigator;