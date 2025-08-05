import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SideMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Menu Items */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Home" as never)}
      >
        <Ionicons name="map" size={22} color="#fff" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Wallet" as never)}
      >
        <Ionicons name="wallet" size={22} color="#fff" />
        <Text style={styles.menuText}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="person" size={22} color="#fff" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="settings" size={22} color="#fff" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Logout Button */}
      <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.menuText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#7B2CBF", 
    paddingTop: 50, 
    paddingHorizontal: 10 
  },
  logo: { 
    width: 160,  // Bigger for visibility
    height: 60, 
    alignSelf: "center", 
    marginBottom: 40 
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuText: { 
    color: "#fff", 
    marginLeft: 12, 
    fontSize: 17, 
    fontWeight: "500" 
  },
  logoutItem: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    marginBottom: 20,
  }
});
