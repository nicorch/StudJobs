import * as React from 'react';
import { Button, Text, View } from 'react-native';
import useAuth from '../hooks/useAuth';

const Messages = () => {
  const { logOut } = useAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="log out" onPress={() => logOut()} />
    </View>
  );
}

export default Messages;
