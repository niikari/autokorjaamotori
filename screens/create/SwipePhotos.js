import { Icon } from "@rneui/themed";
import { useEffect } from "react";
import { View, Text, FlatList, ImageBackground, Dimensions, Pressable, Image } from "react-native";
import NoKameraImage from "../../assets/no_kamera.jpg";

const screen = Dimensions.get("screen")

export default function SwipePhotos({ photos, addPhoto, navigation, route }) {

    const RenderItem = (item) => {
        if (item === "rendercamera") {
            return (
                <ImageBackground
                    source={NoKameraImage}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        width: screen.width - screen.width * 0.4,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Pressable onPress={() => navigation.navigate("camera")}>
                        <Icon name="camera" size={40} color="white" />
                        <Text style={{ fontFamily: 'Dosis', color: "white", fontSize: 20 }}>Ota kuva</Text>
                    </Pressable>
                </ImageBackground>
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                    width: screen.width - screen.width * 0.4,
                }}>
                    <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${item.base64}` }} />
                </View>
            )
        }
    }

    const ListSeperator = () => {
        return (
            <View style={{
                width: 5
            }}/>
        )
    }

    return (
        <FlatList 
            style={{
                margin: 10,
                height: 200,
            }}
            data={photos}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => RenderItem(item)}
            horizontal={true}
            ItemSeparatorComponent={ListSeperator}
            showsHorizontalScrollIndicator={false}
        />
    )
}

