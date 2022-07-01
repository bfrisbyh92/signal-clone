import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React,{ useLayoutEffect } from 'react'
import { Avatar } from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler'

import {auth, db} from '../firebase'
import CustomListItem from '../components/CustomListItem'
const tempPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3na8Ecqhy6F_OoizJeN3AvDhXsq5D7WkVQ&usqp=CAU"

const HomeScreen = ({ navigation }) => {

useLayoutEffect(() => {
  navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <View style={{ marginLeft: 20}}>
          <TouchableOpacity activeOpacity={0.5}>
        <Avatar
          rounded
          source={{ uri: tempPhotoUrl }}
          // ^^^ Need to change to match firebase "photoURL". Need to change components/CustomListItem to also be correct for now I'm using this avatar image url
         />
         </TouchableOpacity>
      </View>
  })
}, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})