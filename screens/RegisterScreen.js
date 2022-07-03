import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar} from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase'

const RegisterScreen = ({ navigation }) => {

// if(auth.currentUser){console.log(auth.currentUser)}

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    
    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: 'Back to Login'
      })
    },[navigation])

    const register = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          const user = authUser.user
          console.log(authUser, user )
            updateProfile(user, {
            displayName: name,
            photoURL: imageUrl,
          })
            .then(() => console.log(` Profile updated successfully! 
              Name/displayName => ${auth.currentUser.displayName}`,
              `PhotoURL/imageUrl=> ${auth.currentUser.photoURL}`))

            .catch((error) => console.log(error.message))
          })
            .catch((error) => alert(error.message))
    }

  return (
    <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
    >
    <StatusBar style='light' />
      <Text h3 style={{marginBottom: 50}}>
      Create a Signal Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
            placeholder='Full Name'
            autoFocus={true}
            type='text'
            value={name}
            onChangeText={(text) => setName(text)}
        />
        <Input
            placeholder='Email'
            type='email'
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <Input
            placeholder='Password'
            type='password'
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <Input
            placeholder='Profile Picture URL (optional)'
            type='text'
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={ register }
            // ^^^ Ensure it submits on pressing enter as well as onPress 
        />
      </View>
      <Button
      containerStyle={ styles.button }
        onPress={register}
        title='register'
        raised={true}
      />
      <View style={{ height: 100 }}/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    }, 
    inputContainer: {
        width: 300,
    },
})
