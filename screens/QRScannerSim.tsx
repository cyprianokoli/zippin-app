// screens/QRScannerSim.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function QRScannerSim() {
  const navigation = useNavigation();
  const [isScanning, setIsScanning] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [rideActive, setRideActive] = useState(false);

  // Simulate QR scanning process
  useEffect(() => {
    if (isScanning) {
      setTimeout(() => {
        setIsScanning(false);
        setIsUnlocked(true);
        // After showing unlocked message, start the ride
        setTimeout(() => {
          setRideActive(true);
        }, 2000);
      }, 3000); // 3 sec scanning simulation
    }
  }, [isScanning]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* SCANNING STATE */}
      {isScanning && (
        <>
          <Ionicons name="qr-code-outline" size={120} color="#fff" />
          <Text style={styles.text}>Scanning QR Code...</Text>
          <ActivityIndicator size="large" color="#a855f7" style={{ marginTop: 20 }} />
        </>
      )}

      {/* SCOOTER UNLOCKED */}
      {isUnlocked && !rideActive && (
        <>
          <Ionicons name="lock-open-outline" size={120} color="#a855f7" />
          <Text style={styles.text}>Scooter Unlocked!</Text>
        </>
      )}

      {/* ACTIVE RIDE MODE */}
      {rideActive && (
        <View style={styles.rideContainer}>
          <Ionicons name="bicycle-outline" size={120} color="#a855f7" />
          <Text style={styles.text}>Ride in Progress</Text>
          <Text style={styles.subText}>00:12:45 • 1.8 km</Text>

          <TouchableOpacity style={styles.endRideButton}>
            <Text style={styles.endRideText}>End Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Styles with Purple, Black & White theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#a855f7",
    padding: 8,
    borderRadius: 50,
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  subText: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 8,
  },
  rideContainer: {
    alignItems: "center",
  },
  endRideButton: {
    backgroundColor: "#a855f7",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  endRideText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
