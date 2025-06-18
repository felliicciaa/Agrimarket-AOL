import BackButton from "@/components/backButtonTopNav";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

// ✅ Import Firestore (pastikan ini sesuai dengan struktur foldermu)
import { db } from "@/components/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const Opsi = () => {
  const router = useRouter();

  const handleOpsiPress = async (option: string) => {
    const userId = 'user_' + Date.now(); // ✅ ID unik tiap kali submit

    try {
      // 🔹 Simpan pilihan user ke Firestore
      await setDoc(doc(db, "userAnswers", userId), {
        kepemilikanLahan: option,
        timestamp: new Date().toISOString(),
      });

      console.log("✅ Opsi tersimpan:", option);

      // 🔹 Arahkan user ke halaman berdasarkan pilihan
      if (option === "Sewa") {
        router.push("/petani/kepemilikanLahan/opsiSewa");
      } else if (option === "Pemilik") {
        router.push("/petani/kepemilikanLahan/opsiPemilik");
      }

    } catch (error) {
      console.error("❌ Gagal menyimpan ke Firestore:", error);
      Alert.alert("Error", "Gagal menyimpan pilihan ke database.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backWrapper}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Kepemilikan{'\n'}Lahan</Text>

        <TouchableOpacity 
          style={styles.opsiButton}
          onPress={() => handleOpsiPress("Sewa")}
        >
          <Text style={styles.opsiText}>Sewa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.opsiButton}
          onPress={() => handleOpsiPress("Pemilik")}
        >
          <Text style={styles.opsiText}>Pemilik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backWrapper: {
    position: 'static',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    marginTop: 160,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  opsiButton: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  opsiText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Opsi;
