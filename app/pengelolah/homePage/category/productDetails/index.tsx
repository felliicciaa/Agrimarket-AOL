import { useRouter } from "expo-router";
import { View, Text, Image, Button } from "react-native";

const ProductDetail = () => {
  const router = useRouter();

  const product = {
    id: "p001",
    name: "Produk Keren",
    price: 15000,
    image:
      "https://example.com/produk.jpg", // Link gambar asli atau dari Firebase Storage
  };

  const handleBuyNow = () => {
    router.push({
      pathname: "/pengelolah/chat",
      params: {
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        image: product.image,
      },
    });
  };

  return (
    <View>
      <Image source={{ uri: product.image }} style={{ width: 200, height: 120 }} />
      <Text>{product.name}</Text>
      <Text>Rp {product.price}</Text>
      <Button title="Buy Now" onPress={handleBuyNow} />
    </View>
  );
};

export default ProductDetail;
