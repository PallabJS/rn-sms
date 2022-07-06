import React, { useEffect } from 'react';
import { request, Permission, PERMISSIONS } from 'react-native-permissions';

import { View, Text } from 'react-native';

import { getAllSms } from '../../src';

export default function App() {
  const [value, setValue] = React.useState(0);
  const getValue = async () => {
    let p = await request(PERMISSIONS.ANDROID.READ_SMS);
    let allSms = await getAllSms();
    console.log(JSON.stringify(allSms, null, 2));
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, color: 'black' }}>{value}</Text>
    </View>
  );
}
