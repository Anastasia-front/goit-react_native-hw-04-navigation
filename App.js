import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// import { getVariable, setVariable, removeVariable } from "./utils/isLogIn";

import Login from "./Screens/LoginScreen";
import Registration from "./Screens/RegistrationScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { useState } from "react";

const AuthStack = createStackNavigator();
const AuthNavigator = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleChange = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Registration">
        {() => <Registration onLogin={handleChange} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Login">
        {() => <Login onLogin={handleChange} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleChange = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const navigation = useNavigation();
  const route = useRoute();
  const { previousScreen } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person";
          } else if (route.name === "Add") {
            iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
          } else if (route.name === "Posts") {
            iconName = focused ? "ios-grid" : "ios-grid";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Світлини",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerRight: () => (
            <Ionicons
              name="ios-log-out"
              size={25}
              color="grey"
              style={{ marginRight: 25 }}
              onPress={handleChange}
            />
          ),
        }}
        initialParams={{ navigation }}
      />
      <Tab.Screen
        name="Add"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="grey"
              style={{ marginLeft: 25 }}
              onPress={() => {
                navigation.goBack();
                // navigation.navigate({ key: previousScreen?.previousKey });
              }}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 18,
            letterSpacing: -0.4,
          },
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="grey"
              style={{ marginLeft: 25 }}
              onPress={() => {
                navigation.goBack();
                // navigation.navigate({ key: previousScreen?.previousKey });
              }}
            />
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{ title: "Профіль", headerShown: false }}
      >
        {() => <ProfileScreen onLogin={handleChange} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TabNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
};

export default App;

// при клике для перехода к комментрариям
// onPress={() => {
//   navigation.navigate('Comments', { previousScreen: route.name });
// }}
