// screens/MapScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "../context/WalletContext";

export default function MapScreen() {
  const navigation = useNavigation();
  const { balance, deductFunds } = useWallet();

  const [region, setRegion] = useState(null);
  const [scooters, setScooters] = useState([]);
  const [activeRide, setActiveRide] = useState(false);
  const [rideTime, setRideTime] = useState(0);
  const [rideDistance, setRideDistance] = useState(0);
  const mapRef = useRef(null);
  const rideTimer = useRef(null);

  const unlockFee = 1.0; // $
  const perMinuteRate = 0.25; // $ per min

  // 📍 Get user location & place scooters
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Generate scooters in realistic spread
      const fakeScooters = Array.from({ length: 6 }).map((_, i) => ({
        id: i + 1,
        latitude:
          loc.coords.latitude + (Math.random() - 0.5) * 0.004,
        longitude:
          loc.coords.longitude + (Math.random() - 0.5) * 0.004,
        battery: Math.floor(Math.random() * 50) + 50,
      }));
      setScooters(fakeScooters);
    })();
  }, []);

  // ▶️ Start ride
  const startRide = () => {
    if (balance < unlockFee) {
      alert("Not enough funds. Please top up your wallet.");
      return;
    }
    setActiveRide(true);
    setRideTime(0);
    setRideDistance(0);

    rideTimer.current = setInterval(() => {
      setRideTime((prev) => prev + 1);
      setRideDistance((prev) => prev + 0.005);
    }, 1000);
  };

  // ⏹ End ride
  const endRide = () => {
    clearInterval(rideTimer.current);

    const totalMinutes = rideTime / 60;
    const rideCost = unlockFee + totalMinutes * perMinuteRate;
    const co2Saved = (rideDistance * 0.21).toFixed(2);

    deductFunds(rideCost, {
      type: "ride",
      amount: rideCost,
      duration: rideTime,
      distance: rideDistance,
      co2Saved: parseFloat(co2Saved),
      date: new Date().toISOString(),
    });

    setActiveRide(false);

    navigation.navigate("RideSummary", {
      transaction: {
        type: "ride",
        amount: rideCost,
        duration: rideTime,
        distance: rideDistance,
        co2Saved,
        date: new Date().toISOString(),
      },
    });
  };

  // 📌 Locate Me
  const locateMe = async () => {
    const loc = await Location.getCurrentPositionAsync({});
    mapRef.current.animateToRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  // 📌 Group Ride placeholder
  const startGroupRide = () => {
    alert("Group Ride feature coming soon!");
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation
        >
          {scooters.map((s) => (
            <Marker
              key={s.id}
              coordinate={{ latitude: s.latitude, longitude: s.longitude }}
              title={`Scooter #${s.id}`}
              description={`Battery: ${s.battery}%`}
              onPress={startRide}
            >
              <Ionicons name="bicycle" size={30} color="#7B2CBF" />
            </Marker>
          ))}
        </MapView>
      )}

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <TouchableOpacity
          style={styles.wallet}
          onPress={() => navigation.navigate("Wallet")}
        >
          <Ionicons name="wallet" size={18} color="#fff" />
          <Text style={styles.walletText}>${balance.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      {/* Map Floating Buttons */}
      {!activeRide && (
        <View style={styles.floatingButtons}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={startGroupRide}
          >
            <Ionicons name="people-outline" size={20} color="#fff" />
            <Text style={styles.floatingButtonText}>Group Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.floatingButton} onPress={locateMe}>
            <Ionicons name="locate-outline" size={20} color="#fff" />
            <Text style={styles.floatingButtonText}>Locate Me</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Ride Controls */}
      {activeRide ? (
        <View style={styles.activeRide}>
          <Text style={styles.rideText}>Time: {rideTime}s</Text>
          <Text style={styles.rideText}>
            Distance: {rideDistance.toFixed(2)} km
          </Text>
          <TouchableOpacity style={styles.endButton} onPress={endRide}>
            <Text style={styles.buttonText}>End Ride</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={startRide}>
            <Text style={styles.buttonText}>Scan to Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  topBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#7B2CBF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: { width: 60, height: 20, resizeMode: "contain" },
  wallet: { flexDirection: "row", alignItems: "center" },
  walletText: { color: "#fff", marginLeft: 5 },
  floatingButtons: {
    position: "absolute",
    right: 20,
    bottom: 150,
    gap: 10,
  },
  floatingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B2CBF",
    padding: 10,
    borderRadius: 25,
  },
  floatingButtonText: { color: "#fff", marginLeft: 5, fontSize: 12 },
  controls: { position: "absolute", bottom: 50, left: 20, right: 20 },
  button: {
    backgroundColor: "#7B2CBF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  endButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  activeRide: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#0008",
    padding: 10,
    borderRadius: 10,
  },
  rideText: { color: "#fff" },
});
