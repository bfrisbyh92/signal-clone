// import { StyleSheet, Text, View } from 'react-native'
// import React, { useLayoutEffect, useState } from 'react'
// import { Button, Input } from 'react-native-elements'
// import Icon from "react-native-vector-icons/FontAwesome"
// import { db, auth } from '../firebase'
// import { collection, addDoc } from "firebase/firestore"; 

// const AddChatScreen = ({ navigation }) => {
//   const [input, setInput] = useState("")

// useLayoutEffect(() => {
//     navigation.setOptions({
//       title: 'Add a new chat',
//       headerBackTitle: "Chats",
//     })
//     console.log(db)
// }, [])

//   const createChat = async () => {
//       await addDoc(collection(db, 'chats'), {
//         chatName: input,
//       })
//       .then((result) => {
//         navigation.goBack()
//         console.log(result)
//       })
//       .catch((err) => {
//         alert(err)
//       })
//   }

//   return (
//     <View style={ styles.container }>
//       <Input
//         placeholder='Enter a chat name'
//         value={ input }
//         onChangeText={(text) => setInput(text) }
//         onSubmitEditing={ createChat }
//         leftIcon={
//           <Icon name="wechat" type="antdesign" size={24} color="black" />
//         }
//       />
//       <Button onPress={ createChat } title="Create a new chat" />
//     </View>
//   )
// }

// export default AddChatScreen

// const styles = StyleSheet.create({
//   container: {
//       backgroundColor: "white",
//       padding: 30,
//       height: "100%",
//   },
// })

import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { collection, addDoc, db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState('')

  const createChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName: chat,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    })
  }, [navigation])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chat}
        onChangeText={(text) => setChat(text)}
        onSubmitEditing={ createChat }
        leftIcon={
          <Icon name="wechat" size={18} type="antdesign" color="black" />
        }
      />
      <Button disabled={!chat} onPress={createChat} title="Create New Chat" />
    </KeyboardAvoidingView>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});