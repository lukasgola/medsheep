import React, { useState, useEffect } from 'react';
import {Text, Dimensions, TouchableOpacity, Button, KeyboardAvoidingView, Image} from 'react-native';

//Hooks
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useCurrentUser } from '../providers/CurrentUserProvider';


//Image Picker
import * as ImagePicker from 'expo-image-picker';
//Firebase
import { uploadImage, auth, updateAvatar } from '../firebase/firebase-config'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


export default function Avatar() {

    const width = Dimensions.get('window').width;

    const {colors} = useTheme();
    const navigation = useNavigation();

    const { currentUser, setCurrentUser } = useCurrentUser();

    const [avatar, setAvatar] = useState(currentUser.avatar);

    const [ imagePicked, setImagePicked] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        // console.log(result);
    
        try {
            if (!result.canceled) {
                setAvatar(result.assets[0].uri)
                await manipulateImage(result.assets[0].uri)
            }
        } catch (error) {
            console.log(error)
        }
        
    };

    const submit = async () => {
        try {
            const url = await uploadImage(auth.currentUser.uid, avatar?.downloadURL, 'quickActions', (progress) => {
                console.log('New Upload progress:', progress + '%');
            });
            await updateAvatar(auth.currentUser.uid, url);
            setCurrentUser({
                name: currentUser.name,
                email: currentUser.email,
                avatar: url.downloadURL,
                lastName: currentUser.lastName,
                birthdate: currentUser.birthdate,
                height: currentUser.height,
                weight: currentUser.weight,
                blood: currentUser.blood
            })
            navigation.goBack();
        } catch (error) {
            console.log(error)
        }
    }

    const manipulateImage = async (uri) => {
        const manipResult = await manipulateAsync(
            uri || uri,
            [
                { resize: { width: 800 } }
            ],
            { compress: 0, format: SaveFormat.JPEG}
        );
        setAvatar({downloadURL: manipResult.uri});
        setImagePicked(true);
    };

    const later = () => {
        navigation.goBack();
    }

  return (
    <KeyboardAvoidingView style={{ 
        flex: 1, 
        //justifyContent: 'center', 
        alignItems: 'center',  
        backgroundColor: colors.container, 
        paddingHorizontal: 10,
        gap: 50,
        paddingTop: 100
    }}>

        <Text style={{
            fontSize: 20,
            fontWeight: '500'
        }}>Wybierz nowe zdjęcie profilowe</Text>

        <TouchableOpacity
            onPress={() => pickImage()}
        >
            <Image 
              source={{uri: avatar}} 
              resizeMode='contain'
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
            />
        </TouchableOpacity>


        {imagePicked && 
            <TouchableOpacity
                style={{
                    width: '100%', 
                    height: 50, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginTop: 20,
                    borderRadius: 10,
                    backgroundColor: colors.primary
                }}
                onPress={() => submit()}
                >
                <Text style={{
                    color: colors.background,
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>Potwierdź</Text>
            </TouchableOpacity>
        }
        

    </KeyboardAvoidingView>
  )
}