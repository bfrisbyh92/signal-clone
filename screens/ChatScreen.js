import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
// import { AsyncStorage } from '@react-native-async-storage/async-storage';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  auth,
  db,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from '../firebase';

const ChatScreen = ({ navigation, route }) => {
  const [msgInput, setMsgInput] = useState('')
  const [messages, setMessages] = useState([])
  
const defaultPhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1htAf5FskKszUw9WnNmoszxdQesLZ48gqsA&usqp=CAU"
  
  const sendMsg = async () => {
    Keyboard.dismiss()

    await addDoc(collection(db, `chats/${route.params.id}`, 'messages'), {
      timestamp: serverTimestamp(),
      message: msgInput,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
      .then(() => setMsgInput(''))
      .catch((error) => alert(error.message))
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, `chats/${route.params.id}`, 'messages'),
          orderBy('timestamp')
          // ^^^ need to come back to here. Messages are being displayed in the wrong order. ^^^
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        }
      ),
    [route]
  )

  useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Chat',
        headerBackTitleVisible: false,
        HeaderTitleAlign: 'left',
        headerTitle: () => (
          <View
            style={{flexDirection: 'row', alignItems: 'center'}}
          >
              <Text>{route.params.chatName < 12 
                ? `${route.params.chatName}` 
                : `${route.params.chatName.substring(0, 12)}...`}
              </Text>
            <Avatar rounded source={{
              uri: messages[0]?.photoURL
            }}/>
            {/* ^^^ Image of the last person to send a message in the chat ^^^ */}
          </View>
        ),
        headerRight: () => (
          <View>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name='arrowleft' size={24} color="black" />
            </TouchableOpacity>
          </View>
        )
  })
},[navigation])
// ^^^ Only runs when navigation or messages change 

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={ styles.container }
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              { messages.map((message) =>
                message.email === auth.currentUser.email ? (
                  <View key={message.id} style={{ alignItems: 'flex-end' }}>
                    <View style={styles.receiver}>
                      <Avatar
                        rounded
                        source={{ uri: message.photoURL }}
                        size={30}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={ styles.receiverText }>{ message.message }</Text>
                    </View>
                  </View>
                ) : (
                  <View key={ message.id } style={{ alignItems: 'flex-start' }}>
                    <View style={styles.sender}>
                      <Avatar
                        rounded
                        source={{ uri: message.photoURL }}
                        size={30}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={ styles.senderText }>{ message.message }</Text>
                      <Text style={ styles.senderName }>
                        { message.displayName }
                      </Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message..."
                style={ styles.textInput }
                value={ msgInput }
                onChangeText={(text) => setMsgInput(text)}
                onSubmitEditing={ sendMsg }
              />
              <TouchableOpacity onPress={ sendMsg } activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 10,
    color: 'gray',
    borderRadius: 30,
  },
  receiverText: {
    color: 'black',
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: 'white',
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignItems: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignItems: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
})
