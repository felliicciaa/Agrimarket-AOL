import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const router = useRouter();

    const handleSendCode = () => {
        // Corrected template string
        console.log(`Sending code to +62${phone}`);
        // Navigate to verify page or call API
        router.push('/login/registrasi-akun'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Masuk ke Akun</Text>
            <Text style={styles.subtitle}>Nomor Telepon</Text>

            <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+62</Text>
                </View>
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Nomor Telepon"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>Kirim Kode</Text>
            </TouchableOpacity>
        </View>
    );
}

// Add basic styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        color: '#84b067',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Sora',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    countryCodeContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginRight: 10,
    },
    countryCode: {
        fontSize: 16,
    },
    phoneInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});


// "use client"

// import { useRouter } from "expo-router"
// import { useState } from "react"
// import {
//     ActivityIndicator,
//     Alert,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native"

// interface LoginResponse {
//   success: boolean
//   message: string
//   data?: {
//     verificationId: string
//     expiresAt: string
//   }
//   error?: string
// }

// export default function LoginPage() {
//   const [phone, setPhone] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<{ phone?: string }>({})
//   const router = useRouter()

//   // Validate phone number
//   const validatePhone = (phoneNumber: string): boolean => {
//     // Indonesian phone number validation (8-13 digits after +62)
//     const phoneRegex = /^[0-9]{8,13}$/
//     return phoneRegex.test(phoneNumber)
//   }

//   // Format phone number for display
//   const formatPhoneNumber = (value: string): string => {
//     // Remove any non-digit characters
//     const cleaned = value.replace(/\D/g, "")

//     // Limit to 13 digits
//     return cleaned.slice(0, 13)
//   }

//   // Handle phone input change
//   const handlePhoneChange = (value: string) => {
//     const formatted = formatPhoneNumber(value)
//     setPhone(formatted)

//     // Clear phone error when user starts typing
//     if (errors.phone) {
//       setErrors((prev) => ({ ...prev, phone: undefined }))
//     }
//   }

//   // Send verification code to backend
//   const sendVerificationCode = async (phoneNumber: string): Promise<LoginResponse> => {
//     try {
//       const response = await fetch("/api/auth/send-verification", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           phoneNumber: `+62${phoneNumber}`,
//           type: "login",
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to send verification code")
//       }

//       return data
//     } catch (error) {
//       console.error("API Error:", error)
//       throw error
//     }
//   }

//   const handleSendCode = async () => {
//     // Reset errors
//     setErrors({})

//     // Validate input
//     if (!phone.trim()) {
//       setErrors({ phone: "Nomor telepon harus diisi" })
//       return
//     }

//     if (!validatePhone(phone)) {
//       setErrors({ phone: "Nomor telepon tidak valid (8-13 digit)" })
//       return
//     }

//     setIsLoading(true)

//     try {
//       console.log(`Sending code to +62${phone}`)

//       // Call backend API
//       const response = await sendVerificationCode(phone)

//       if (response.success) {
//         // Store verification data for next screen
//         const verificationData = {
//           phoneNumber: `+62${phone}`,
//           verificationId: response.data?.verificationId,
//           expiresAt: response.data?.expiresAt,
//         }

//         // Navigate to verification page with data
//         router.push({
//           pathname: "/login/verif",
//           params: verificationData,
//         })

//         Alert.alert("Kode Terkirim", `Kode verifikasi telah dikirim ke +62${phone}`, [{ text: "OK" }])
//       } else {
//         throw new Error(response.message || "Gagal mengirim kode verifikasi")
//       }
//     } catch (error: any) {
//       console.error("Send code error:", error)

//       // Handle different types of errors
//       let errorMessage = "Terjadi kesalahan. Silakan coba lagi."

//       if (error.message.includes("network") || error.message.includes("fetch")) {
//         errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
//       } else if (error.message.includes("rate limit")) {
//         errorMessage = "Terlalu banyak percobaan. Silakan tunggu beberapa menit."
//       } else if (error.message.includes("invalid phone")) {
//         errorMessage = "Nomor telepon tidak valid."
//       } else if (error.message) {
//         errorMessage = error.message
//       }

//       Alert.alert("Error", errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Masuk ke Akun</Text>
//         <Text style={styles.subtitle}>Nomor Telepon</Text>

//         <View style={styles.phoneInputContainer}>
//           <View style={styles.countryCodeContainer}>
//             <Text style={styles.countryCode}>+62</Text>
//           </View>
//           <TextInput
//             style={[styles.phoneInput, errors.phone && styles.phoneInputError]}
//             placeholder="Nomor Telepon"
//             placeholderTextColor="#999"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={handlePhoneChange}
//             editable={!isLoading}
//             maxLength={13}
//           />
//         </View>

//         {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//         <TouchableOpacity
//           style={[styles.button, (isLoading || !phone.trim()) && styles.buttonDisabled]}
//           onPress={handleSendCode}
//           disabled={isLoading || !phone.trim()}
//         >
//           {isLoading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.buttonText}>Kirim Kode</Text>
//           )}
//         </TouchableOpacity>

//         <View style={styles.helpContainer}>
//           <Text style={styles.helpText}>
//             Dengan melanjutkan, Anda menyetujui <Text style={styles.linkText}>Syarat & Ketentuan</Text> dan{" "}
//             <Text style={styles.linkText}>Kebijakan Privasi</Text>
//           </Text>
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
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     color: "#84b067",
//     fontSize: 40,
//     fontWeight: "bold",
//     marginBottom: 20,
//     fontFamily: "Sora",
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#333",
//     fontWeight: "500",
//   },
//   phoneInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   countryCodeContainer: {
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//     borderRadius: 8,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: "#e9ecef",
//   },
//   countryCode: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
//   phoneInput: {
//     flex: 1,
//     borderBottomWidth: 2,
//     borderBottomColor: "#e9ecef",
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 4,
//     color: "#333",
//   },
//   phoneInputError: {
//     borderBottomColor: "#dc3545",
//   },
//   errorText: {
//     color: "#dc3545",
//     fontSize: 14,
//     marginBottom: 16,
//     marginLeft: 4,
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//     shadowColor: "#4CAF50",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   buttonDisabled: {
//     backgroundColor: "#a8d8a8",
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   helpContainer: {
//     marginTop: 30,
//     paddingHorizontal: 10,
//   },
//   helpText: {
//     fontSize: 12,
//     color: "#666",
//     textAlign: "center",
//     lineHeight: 18,
//   },
//   linkText: {
//     color: "#4CAF50",
//     fontWeight: "500",
//   },
// })
