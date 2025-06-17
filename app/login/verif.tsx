import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OTPVerificationPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifikasi OTP</Text>
      <Text style={styles.subtitle}>Silahkan isi nomor OTP yang telah dikirimkan melalui Whatsapp.</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity 
      onPress={() => router.push('/login/choose-role')}style={styles.confirmButton}>
        <Text style={styles.confirmText}>Konfirmasi</Text>
      </TouchableOpacity>

      <View style={styles.bottomSection}>
        <Text style={styles.notReceived}>Tidak mendapat pesan?</Text>

        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Kirim Ulang</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.tryOther}>Atau coba cara lain</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#7AA35A',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: '#888',
      marginBottom: 24,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    otpInput: {
      borderWidth: 1,
      borderColor: '#7AA35A',
      borderRadius: 8,
      width: 56,
      height: 56,
      textAlign: 'center',
      fontSize: 20,
      color: '#000',
    },
    confirmButton: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 32,
    },
    confirmText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    bottomSection: {
      alignItems: 'flex-start',
    },
    notReceived: {
      fontSize: 14,
      marginBottom: 8,
    },
    resendButton: {
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    resendText: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    tryOther: {
      fontSize: 14,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });
  
// "use client"

// import { useLocalSearchParams, useRouter } from "expo-router"
// import { useRef, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"

// export default function VerifyCodePage() {
//   const router = useRouter()
//   const params = useLocalSearchParams()
//   const [code, setCode] = useState(["", "", "", ""])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isResending, setIsResending] = useState(false)
//   const inputRefs = useRef<(TextInput | null)[]>([])

//   const phoneNumber = params.phoneNumber as string
//   const verificationId = params.verificationId as string

//   const handleCodeChange = (value: string, index: number) => {
//     const newCode = [...code]
//     newCode[index] = value
//     setCode(newCode)

//     // Auto-focus next input
//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus()
//     }
//   }

//   const handleKeyPress = (key: string, index: number) => {
//     if (key === "Backspace" && !code[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus()
//     }
//   }

//   const verifyCode = async () => {
//     const enteredCode = code.join("")

//     if (enteredCode.length !== 4) {
//       Alert.alert("Error", "Masukkan kode OTP 4 digit")
//       return
//     }

//     setIsLoading(true)

//     try {
//       const response = await fetch("/api/auth/verify-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           verificationId,
//           code: enteredCode,
//           phoneNumber,
//         }),
//       })

//       const data = await response.json()

//       if (data.success) {
//         // Store auth token if provided
//         if (data.data?.token) {
//           console.log("Auth token:", data.data.token)
//         }

//         Alert.alert("Berhasil", "Verifikasi berhasil!", [
//           {
//             text: "OK",
//             onPress: () => {
//               if (data.data?.isNewUser) {
//                 router.replace("/login/registrasi-akun")
//               } else {
//                 router.replace("/konsumen/homePage")
//               }
//             },
//           },
//         ])
//       } else {
//         Alert.alert("Error", data.error || "Kode OTP salah")
//       }
//     } catch (error) {
//       console.error("Verify code error:", error)
//       Alert.alert("Error", "Terjadi kesalahan. Silakan coba lagi.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const resendCode = async () => {
//     setIsResending(true)

//     try {
//       const response = await fetch("/api/auth/send-verification", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           phoneNumber,
//           type: "login",
//         }),
//       })

//       const data = await response.json()

//       if (data.success) {
//         setCode(["", "", "", ""]) // Clear code
//         Alert.alert("Berhasil", "Kode OTP baru telah dikirim melalui WhatsApp")
//       } else {
//         Alert.alert("Error", data.error || "Gagal mengirim ulang kode")
//       }
//     } catch (error) {
//       Alert.alert("Error", "Terjadi kesalahan. Silakan coba lagi.")
//     } finally {
//       setIsResending(false)
//     }
//   }

//   const handleTryAnotherWay = () => {
//     Alert.alert("Cara Lain", "Pilih metode verifikasi lain:", [
//       { text: "SMS", onPress: () => console.log("Switch to SMS") },
//       { text: "Email", onPress: () => console.log("Switch to Email") },
//       { text: "Batal", style: "cancel" },
//     ])
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Verifikasi OTP</Text>
//         <Text style={styles.subtitle}>Silahkan isi nomor OTP yang telah{"\n"}dikirimkan melalui Whatsapp.</Text>

//         <View style={styles.codeContainer}>
//           {code.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={(ref) => { inputRefs.current[index] = ref; }}
//               style={styles.codeInput}
//               value={digit}
//               onChangeText={(value) => handleCodeChange(value, index)}
//               onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
//               keyboardType="numeric"
//               maxLength={1}
//               textAlign="center"
//             />
//           ))}
//         </View>

//         <TouchableOpacity
//           style={[styles.confirmButton, isLoading && styles.buttonDisabled]}
//           onPress={verifyCode}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#333" size="small" />
//           ) : (
//             <Text style={styles.confirmButtonText}>Konfirmasi</Text>
//           )}
//         </TouchableOpacity>

//         <View style={styles.bottomSection}>
//           <Text style={styles.noMessageText}>Tidak mendapat pesan?</Text>

//           <TouchableOpacity style={styles.resendButton} onPress={resendCode} disabled={isResending}>
//             <Text style={styles.resendButtonText}>{isResending ? "Mengirim..." : "Kirim Ulang"}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleTryAnotherWay}>
//             <Text style={styles.alternativeText}>Atau coba cara lain</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "600",
//     color: "#84b067",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 48,
//     lineHeight: 24,
//   },
//   codeContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 16,
//     marginBottom: 48,
//   },
//   codeInput: {
//     width: 60,
//     height: 60,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#333",
//     backgroundColor: "#fff",
//     textAlign: "center",
//   },
//   confirmButton: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   confirmButtonText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
//   bottomSection: {
//     alignItems: "center",
//     gap: 16,
//   },
//   noMessageText: {
//     fontSize: 16,
//     color: "#333",
//     textAlign: "center",
//   },
//   resendButton: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   resendButtonText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
//   alternativeText: {
//     fontSize: 16,
//     color: "#333",
//     textDecorationLine: "underline",
//   },
// })
