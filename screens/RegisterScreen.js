import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar} from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth  } from '../firebase'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: 'Back to Login'
      })
    },[navigation])

    const register = async() => {
   // I'm importing the needed function from firebase to createUser with the email and password
   // Register is the name of the onPress function, async because creating a user involves promises that can fail
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user)
        navigation.navigate('Login')
      })
      .catch(error =>
        console.log(error.message)
    );
  };

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