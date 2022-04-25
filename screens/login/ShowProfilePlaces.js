import { ListItem } from "@rneui/themed";
import { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import userContext from "../../context/userContext";

export default function ShowProfilePlaces() {

    const { state } = useContext(userContext)

    const RenderItem = (item) => {
        return (
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{item.oy}</ListItem.Title>                
                    <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
                    <Text>{item.street}</Text>
                    <Text>{item.postCode}</Text>
                    <Text>{item.city}</Text>
                    <Text>{item.phone}</Text>
                </ListItem.Content>
            </ListItem>
        )
    }

    const ListSeperator = () => {
        return (
            <View style={{
                width: 20,
            }} 
            />
        )
    }

    return (
        <FlatList 
            style={{
                margin: 20
            }}
            data={state.user.places}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => RenderItem(item)}
            horizontal
            ItemSeparatorComponent={ListSeperator}
        />
    )
}