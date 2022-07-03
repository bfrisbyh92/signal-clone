// import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar'
// import { Button,  Input, Image } from 'react-native-elements'
// import { auth } from '../firebase'
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   useEffect(() => {
//    const unsubscribe = auth.onAuthStateChanged((user) => {
//       console.log(user)
//       if(user){
//         navigation.replace("Home")
//       }
//     })
//     return unsubscribe;
//   }, [])

//   const signIn = async() => {
//       // const auth = getAuth();
//       signInWithEmailAndPassword(auth, email, password)
//       .then(({ user }) => {
//         console.log(user) 
//         // Note to Self: Come back here and get displayName, photoURL/imageUrl and properties in firebase to match our signed in user
//         navigation.navigate('Home')
//       })
//       .catch(error =>
//         alert(error.message)
//     );
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior='padding' enabled={true} >
//     <StatusBar style='light' />
//     <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-JcFBAhfiWOteFGYvytGedbESmN52WrLd0UpAJdwEyeawbFt94nAFBb3vCXnSx-NNz8&usqp=CAU'}}
//        style={{width: 180, height: 180}}
//         />
//       <View style={styles.inputContainer}>
//         <Input placeholder="Email"
//           autoFocus
//           value={email}
//           onChangeText={text => setEmail(text)}
//           type="email"
//          />
//          <Input placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={text => setPassword(text)}
//           type="password"
//           onSubmitEditing={ signIn }
//          />
//       </View>
//         <Button title="Login"
//           containerStyle={styles.button}
//           onPress={signIn}
//           raised
//          />
//         <Button title="Register"
//           containerStyle={styles.button}
//           type='outline'
//           raised
//           onPress={() => navigation.navigate('Register')}
//          />
//          <View style={{ height: 100 }}></View>
//       </KeyboardAvoidingView>
//   )
// }

// export default LoginScreen

// const styles = StyleSheet.create({
//     container : {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 10,
//       backgroundColor: 'white',
//     },
//     inputContainer : {
//   width: 300,
//     },
//     button : {
//       width: 200,
//       marginTop: 10,
//     },
// });

import React, { useEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  auth,
} from '../firebase'

const logo = require('../assets/signal-icon-black.png')

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) navigation.replace('Home')
      }),
    []
  )

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log(`User: ${user.email} successfully signed in`)
      console.log(`DisplayName: ${user.displayName} photoURL: ${user.photoURL}`)
        navigation.replace('Home')
    })
      .catch((error) =>
        alert(error.message)
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image source={ logo } style={{width: 180, height: 180}} />
      <View style={ styles.inputContainer }>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={( text ) => setPassword(text)}
          onSubmitEditing={ signIn }
        />
      </View>

      <Button containerStyle={ styles.button } onPress={ signIn } title="Login" />
      <Button
        containerStyle={ styles.button }
        onPress={() => navigation.navigate('Register')}
        type="outline"
        title="Registers"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  ImageDimension: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    width: 300,
    marginVertical: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
})