import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "../components/PostsScreen";

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
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
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        onPress={() => navigation.navigate("PostsScreen")}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Add"
        component={Settings}
        onPress={() => navigation.navigate("CreatePostsScreen")}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        onPress={() => navigation.navigate("ProfileScreen")}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
