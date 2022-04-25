import { Button } from "@rneui/themed";
import { Alert, View } from "react-native";
import { app, db } from "../../firebase";
import { getStorage, ref as stoRef, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { push, ref as dbRef } from "firebase/database";

const storage = getStorage(app)

export default function CreateAndSaveButton({ header, discription, photos, debs, places, initialize, userId, price }) {

    const checkAndSave = () => {
        if (!price | !header | !discription | places.length === 0 | debs.length === 0) {
            Alert.alert("Sinun täytyy lisätä:", "Otsikko, kuvaus, hinta, osasto ja toimipiste")
        } else {
            // LAITETAAN ENSIN KUVAT STORAGEEN => SAADAAN URL OSOITTEET, JOTKA LISÄTÄÄN ILMOITUKSEEN
            push(
                dbRef(db, 'adverts'), {
                    header: header,
                    discription: discription,
                    department: debs[0].name,
                    userId: userId,
                    place: places[0],
                    price: price,
                    date: new Date().getTime()
                }
            )
            .then(() => {
                initialize()
                Alert.alert("Loistavaa", "Ilmoituksesi lisätty onnistuneesti!")
            })
        }
    }

    return (
        <View style={{
            margin: 10
        }}>
            <Button 
                title="Ilmoita"
                onPress={checkAndSave}
            />
        </View>
    )
}