import * as React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import fetchHelper from "../Datas/fetchHelper";


const Stack = createNativeStackNavigator();
import { REACT_APP_FIREBASE_BASEURL } from '@env'
import OffresScreen from '../Offres/OffresScreen';


const OffreNavigator = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState(null);

    const updateFilters = (data) => {
        setFilters(data);
    }

    React.useEffect(() => {
        setLoading(true);
        fetchAndSetData()
    }, [filters])

    const fetchAndSetData = async () => {
        try {
            const serverData = await fetchHelper.getOffers(filters ? clean(filters) : {});
            setData(serverData);
        } catch (err) {
            console.error('err -->', err);
        }
        setLoading(false);
    };

    function clean(object) {
        Object
            .entries(object)
            .forEach(([k, v]) => {
                if (v && typeof v === 'object') {
                    clean(v);
                }
                if (v && typeof v === 'object' && !Object.keys(v).length || v === null || v === undefined) {
                    if (Array.isArray(object)) {
                        object.splice(k, 1);
                    } else {
                        delete object[k];
                    }
                }
            });
        return object;
    }

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
        <Stack.Navigator>
            <Stack.Screen
                name="OffresList"
                options={{ title: "Offres Actuelles" }}
            >
                {(props) => (
                    <OffresScreen
                        {...props}
                        data={[]}
                        loading={loading}
                        setData={setData}
                        setFilters={updateFilters}
                    />
                )}

            </Stack.Screen>

        </Stack.Navigator>
    );
}

export default OffreNavigator;