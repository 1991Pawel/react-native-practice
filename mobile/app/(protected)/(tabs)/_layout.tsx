import { Tabs } from "expo-router";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TAB_LABELS = {
  dashboard: "Dashboard",
  settings: "Settings",
  profile: "Profile",
} as const;

const _Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FB617C",
        tabBarInactiveTintColor: "#ccc",

        tabBarItemStyle: {
          alignItems: "center",
          flexDirection: "row",
          height: 80,
        },

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginHorizontal: 20,
          backgroundColor: "#0D0B26",
          borderRadius: 50,
        },

        tabBarLabel: ({ focused, color }) =>
          focused ? (
            <Text style={{ fontSize: 12, color }}>
              {TAB_LABELS[route.name as keyof typeof TAB_LABELS]}
            </Text>
          ) : null,
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
