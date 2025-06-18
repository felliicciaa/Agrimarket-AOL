import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

const Cart = () => {
  const { id, name, price, image } = useLocalSearchParams();

  return (
    <View>
      <Text>Keranjang Belanja</Text>
      <Image
        source={{ uri: Array.isArray(image) ? image[0] : (image as string) }}
        style={{ width: 200, height: 120 }}
      />
      <Text>{name}</Text>
      <Text>Rp {price}</Text>
    </View>
  );
};

export default Cart;
