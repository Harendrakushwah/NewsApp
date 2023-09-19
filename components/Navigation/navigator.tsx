import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsOverview from "../../Screens/NewsOverview";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/Home";
import Saved from "../../Screens/Saved";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeScreen(){
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
          options={{tabBarIcon(props) {
            return (
              <Icon
                name={props.focused ? "home-circle" : "home-circle-outline"}
                {...props}
                />
            );
        },  
        }} 
          name="Home" 
          component={Home} />
        <Tab.Screen 
          options={{tabBarIcon(props) {
            return (
              <Icon
                name={props.focused ? "content-save-all" : "content-save-all-outline"}
                {...props}
                />
            );
        },
        }} 
          name="Saved" 
          component={Saved} />
      </Tab.Navigator>
    );
}
export default function AppNavigator() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NewsOverview" component={NewsOverview} />
        </Stack.Navigator>
    </NavigationContainer>
}