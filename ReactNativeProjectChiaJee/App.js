import { TouchableOpacity } from 'react-native';
import ContactDetailsScreen from './components/contactDetailsScreen';
import ContactsScreen from './components/contactsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { globalColor } from "./assets/color/color.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="ContactsScreen"
              component={ContactsScreen}
              options={{
                title: 'Contacts',
                headerLeft: () => (
                    <TouchableOpacity>
                      <Ionicons name="search" size={25} color={globalColor.colorPrimary} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity>
                      <Ionicons name="add" size={30} color={globalColor.colorPrimary} />
                    </TouchableOpacity>
                ),
              }} />
          <Stack.Screen
              name="ContactDetailsScreen"
              component={ContactDetailsScreen}
              options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
