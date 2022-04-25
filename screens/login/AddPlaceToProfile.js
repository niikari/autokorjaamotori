import { Button, Dialog, Input } from "@rneui/themed";
import { useState } from "react";
import { useContext } from "react";
import { View, Text } from "react-native";
import userContext from "../../context/userContext";
import ShowProfilePlaces from "./ShowProfilePlaces";
import { db } from "../../firebase";
import { set, ref } from "firebase/database";

export default function AddPlaceToProfile() {

    const { state } = useContext(userContext)
    const [visible, setVisible] = useState(false)
    const [place, setPlace] = useState({
        oy: '',
        name: '',
        street: '',
        postCode: '',
        city: '',
        phone: ''
    })
    const [errMsg, setErrMsg] = useState('')

    const buttonPressed = () => {
        setVisible(true)
    }

    const cancel = () => {
        setVisible(!visible)
        setPlace({
            oy: '',
            name: '',
            street: '',
            postCode: '',
            city: '',
            phone: ''
        })
    }

    const confirm = () => {
        if (place.oy == '' | place.name == '' | place.street == '' | place.postCode == '' | place.city == '' | place.phone == '') {
            setErrMsg('Kaikki kohdat täytettävä')
            setTimeout(() => {
                setErrMsg('')
            }, 2000);
        } else {
            state.user.places ? (
                set(
                    ref(db, `users/${state.user.uid}`), {
                        ...state.user,
                        places: [...state.user.places, place]
                    }
                )
            )
            :
            (
                set(
                    ref(db, `users/${state.user.uid}`), {
                        ...state.user,
                        places: [place]
                    }
                )
            )
            setVisible(!visible)
        }
    }

    return (
        <View>
            {
                state.user.places ? (
                    <View style={{
                        margin: 40
                    }}>
                        <ShowProfilePlaces />
                        <Button 
                            title="Lisää"
                            titleStyle={{
                                fontFamily: 'Dosis'
                            }}
                            onPress={buttonPressed}
                        />
                    </View>
                )
                :
                (
                    <View style={{
                        margin: 40
                    }}>
                        <Text style={{ fontFamily: 'Dosis', color: "black", fontSize: 20, textAlign: "center" }}>Ei vielä toimipaikkoja</Text>
                        <Button 
                            title="Lisää ensimmäinen"
                            titleStyle={{
                                fontFamily: 'Dosis'
                            }}
                            onPress={buttonPressed}
                        />
                    </View>
                )
            }
            <Dialog
                isVisible={visible}
                onBackdropPress={cancel}
            >
                <Dialog.Title title="Anna paikkasi tiedot" titleStyle={{ fontFamily: 'Dosis', textAlign: "center" }} />
                <Text style={{ fontFamily: 'Dosis',textAlign:"center" }}>Nämä tiedot näkyvät ilmoituksessa</Text>
                <Input 
                    placeholder="Yritys Oy"
                    value={place.oy}
                    onChangeText={txt => setPlace({...place, oy: txt})}
                    errorMessage={errMsg}
                />
                <Input 
                    placeholder="Toimipaikan nimi"
                    value={place.name}
                    onChangeText={txt => setPlace({...place, name: txt})}
                    errorMessage={errMsg}
                />
                <Input 
                    placeholder="Katuosoite"
                    value={place.street}
                    onChangeText={txt => setPlace({...place, street: txt})}
                    errorMessage={errMsg}
                />
                <Input 
                    placeholder="Postinumero"
                    value={place.postCode}
                    onChangeText={txt => setPlace({...place, postCode: txt})}
                    errorMessage={errMsg}
                />
                <Input 
                    placeholder="Kaupunki"
                    value={place.city}
                    onChangeText={txt => setPlace({...place, city: txt})}
                    errorMessage={errMsg}
                />
                <Input 
                    placeholder="Puhelinnumero"
                    value={place.phone}
                    onChangeText={txt => setPlace({...place, phone: txt})}
                    errorMessage={errMsg}
                />
                <Dialog.Actions>                    
                    <Dialog.Button title="Vahvista" onPress={confirm} />
                    <Dialog.Button title="Peruuta" titleStyle={{ color: "red" }} onPress={cancel} />
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}