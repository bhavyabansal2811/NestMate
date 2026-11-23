import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from '../src/screens/HomeScreen';
import ShortlistScreen from '../src/screens/ShortlistScreen';
import EditProfileScreen from '../src/screens/EditProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Shortlist" component={ShortlistScreen} />
        <Tab.Screen name="Profile" component={EditProfileScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
