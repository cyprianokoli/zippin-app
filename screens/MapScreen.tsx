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
  const rideTimer = useRef(null);

  // Cost settings
  const unlockFee = 1.0; // $
  const perMinuteRate = 0.25; // $ per min

  // 📍 Get user location & fake scooters nearby
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

      // Create fake scooters near user
      const fakeScooters = Array.from({ length: 5 }).map((_, i) => ({
        id: i + 1,
        latitude: loc.coords.latitude + (Math.random() - 0.5) * 0.002,
        longitude: loc.coords.longitude + (Math.random() - 0.5) * 0.002,
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
      setRideDistance((prev) => prev + 0.005); // ~18 km/h simulation
    }, 1000);
  };

  // ⏹ End ride
  const endRide = () => {
    clearInterval(rideTimer.current);

    const totalMinutes = rideTime / 60;
    const rideCost = unlockFee + totalMinutes * perMinuteRate;
    const co2Saved = (rideDistance * 0.21).toFixed(2); // kg saved approx

    // ✅ Deduct funds & save transaction to wallet
    deductFunds(rideCost, {
      type: "ride",
      amount: rideCost,
      duration: rideTime,
      distance: rideDistance,
      co2Saved: parseFloat(co2Saved),
      date: new Date().toISOString(),
    });

    setActiveRide(false);

    // ✅ Navigate to Ride Summary
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

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} initialRegion={region} showsUserLocation>
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

      {/* Ride Controls */}
      {!activeRide ? (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={startRide}>
            <Text style={styles.buttonText}>Scan to Ride</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.activeRide}>
          <Text style={styles.rideText}>Time: {rideTime}s</Text>
          <Text style={styles.rideText}>
            Distance: {rideDistance.toFixed(2)} km
          </Text>
          <TouchableOpacity style={styles.endButton} onPress={endRide}>
            <Text style={styles.buttonText}>End Ride</Text>
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





//Version 3
// // screens/MapScreen.tsx
// import React, { useEffect, useState, useRef } from "react";
// import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export default function MapScreen() {
//   const navigation = useNavigation();
//   const [location, setLocation] = useState(null);
//   const [region, setRegion] = useState(null);
//   const [scooters, setScooters] = useState([]);
//   const [activeRide, setActiveRide] = useState(false);
//   const [rideTime, setRideTime] = useState(0); // seconds
//   const [rideCost, setRideCost] = useState(0);
//   const timerRef = useRef(null);
//   const rideRatePerMinute = 0.50; // 💲 per minute
//   const walletBalance = 12.50; // Example balance

//   // Get user's location
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission denied");
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);
//       setRegion({
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });

//       // Simulate nearby scooters
//       const fakeScooters = [
//         {
//           id: 1,
//           latitude: loc.coords.latitude + 0.0005,
//           longitude: loc.coords.longitude + 0.0005,
//         },
//         {
//           id: 2,
//           latitude: loc.coords.latitude - 0.0005,
//           longitude: loc.coords.longitude - 0.0003,
//         },
//         {
//           id: 3,
//           latitude: loc.coords.latitude + 0.0002,
//           longitude: loc.coords.longitude - 0.0004,
//         },
//       ];
//       setScooters(fakeScooters);
//     })();
//   }, []);

//   // Start ride tracking
//   const startRide = () => {
//     setActiveRide(true);
//     setRideTime(0);
//     setRideCost(0);
//     timerRef.current = setInterval(() => {
//       setRideTime((prev) => prev + 1);
//       setRideCost((prev) => {
//         const minutes = (rideTime + 1) / 60;
//         return parseFloat((minutes * rideRatePerMinute).toFixed(2));
//       });
//     }, 1000);
//   };

//   // End ride tracking
//   const endRide = () => {
//     setActiveRide(false);
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//   };

//   // Format time
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <View style={styles.container}>
//       {region && (
//         <MapView style={styles.map} initialRegion={region} showsUserLocation>
//           {/* Scooters */}
//           {scooters.map((scooter) => (
//             <Marker
//               key={scooter.id}
//               coordinate={{
//                 latitude: scooter.latitude,
//                 longitude: scooter.longitude,
//               }}
//               title="Zippin Scooter"
//               description="Tap to ride!"
//               onPress={startRide}
//             >
//               <Ionicons name="bicycle" size={32} color="#7B2CBF" />
//             </Marker>
//           ))}
//         </MapView>
//       )}

//       {/* Top bar with logo & wallet */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Ionicons name="menu" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Image
//           source={require("../assets/logo.png")}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <View style={styles.wallet}>
//           <Ionicons name="wallet" size={20} color="#fff" />
//           <Text style={styles.walletText}>${walletBalance.toFixed(2)}</Text>
//         </View>
//       </View>

//       {/* Floating Buttons */}
//       {!activeRide && (
//         <View style={styles.fabContainer}>
//           <TouchableOpacity style={styles.fab}>
//             <Text style={styles.fabText}>Group Ride</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.fab}
//             onPress={() => navigation.navigate("QRScannerSim")}
//           >
//             <Text style={styles.fabText}>Scan to Ride</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.fab}>
//             <Text style={styles.fabText}>Locate Me</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Active Ride Overlay */}
//       {activeRide && (
//         <View style={styles.activeRide}>
//           <Text style={styles.rideTitle}>Scooter Unlocked!</Text>
//           <Text style={styles.rideTime}>Ride Time: {formatTime(rideTime)}</Text>
//           <Text style={styles.rideCost}>Cost: ${rideCost.toFixed(2)}</Text>
//           <TouchableOpacity style={styles.endRideButton} onPress={endRide}>
//             <Text style={styles.endRideText}>End Ride</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },
//   map: { flex: 1 },
//   topBar: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//     right: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#7B2CBF",
//     padding: 10,
//     borderRadius: 12,
//   },
//   logo: { width: 80, height: 30 },
//   wallet: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#000",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   walletText: { color: "#fff", marginLeft: 4, fontWeight: "bold" },
//   fabContainer: {
//     position: "absolute",
//     bottom: 50,
//     right: 20,
//     alignItems: "flex-end",
//   },
//   fab: {
//     backgroundColor: "#7B2CBF",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 25,
//     marginVertical: 6,
//     elevation: 3,
//   },
//   fabText: { color: "#fff", fontWeight: "bold" },
//   activeRide: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#7B2CBF",
//     padding: 20,
//     alignItems: "center",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   rideTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
//   rideTime: { fontSize: 16, color: "#fff", marginVertical: 4 },
//   rideCost: { fontSize: 16, color: "#fff", marginBottom: 10 },
//   endRideButton: {
//     backgroundColor: "#000",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//   },
//   endRideText: { color: "#fff", fontWeight: "bold" },
// });






//Version 2
// // screens/MapScreen.tsx
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// export default function MapScreen() {
//   const [region, setRegion] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location denied');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {region && (
//         <MapView style={styles.map} initialRegion={region} showsUserLocation>
//           <Marker coordinate={{
//             latitude: region.latitude + 0.0005,
//             longitude: region.longitude + 0.0005
//           }}>
//             <Image source={require('../assets/scooter-icon.png')} style={{ width: 40, height: 40 }} />
//           </Marker>
//         </MapView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

//VERsion 1
// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, Dimensions, Image } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location"; // For GPS permissions & location

// export default function MapScreen() {
//   const [region, setRegion] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);

//   // Example scooter locations
//   const scooterLocations = [
//     { id: 1, latitude: 37.78825, longitude: -122.4324, title: "Scooter A" },
//     { id: 2, latitude: 37.78925, longitude: -122.4354, title: "Scooter B" },
//     { id: 3, latitude: 37.79025, longitude: -122.4374, title: "Scooter C" },
//   ];

//   // Request location permissions & get current location
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.warn("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation(location.coords);
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {region && (
//         <MapView style={styles.map} initialRegion={region} showsUserLocation={true}>
          
//           {/* Scooters with custom icons */}
//           {scooterLocations.map((scooter) => (
//             <Marker
//               key={scooter.id}
//               coordinate={{
//                 latitude: scooter.latitude,
//                 longitude: scooter.longitude,
//               }}
//               title={scooter.title}
//               description="Tap to unlock scooter 🚀"
//             >
//               {/* Custom scooter icon */}
//               <Image
//                 source={require("../assets/scooter-icon.png")}
//                 style={{ width: 35, height: 35 }}
//               />
//             </Marker>
//           ))}

//         </MapView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });
