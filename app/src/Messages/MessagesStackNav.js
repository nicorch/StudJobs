import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import MessageScreen from "./MessageScreen";

const MessageStack = createNativeStackNavigator();

const MessagesStackNav = () => {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

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

    return(
        <MessageStack.Navigator>
            <MessageStack.Screen
                name="Message"
                options={{ title: "Vos messages" }}
            >
            {(props) => (
                <MessageScreen
                    {...props}
                    messages={data}
                    loading={loading}
                    setData={setData}
                    />
            )}
            </MessageStack.Screen>
        </MessageStack.Navigator>
    )

}

export default MessagesStackNav;