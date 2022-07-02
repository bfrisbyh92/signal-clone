import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
const tempPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3na8Ecqhy6F_OoizJeN3AvDhXsq5D7WkVQ&usqp=CAU"
// ^^^ Change after builds done to line up with user profile ^^^
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const ChatScreen = ({ navigation, route }) => {

  useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Chat',
        headerBackTitleVisible: false,
        HeaderTitleAlign: 'left',
        headerTitle: () => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Avatar rounded source={{uri: tempPhotoUrl }} />
            <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}
            >
            {route.params.chatName}
            </Text>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={ navigation.goBack }
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              marginRight: 20,
            }}
          >
            <TouchableOpacity style={{ marginRight: 25 }}>
              <FontAwesome name="video-camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )
      })
  },[navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={ styles.container }
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>
            {/* Chat goes here -- This is my stopping point for right now as well. */}
          </ScrollView>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})