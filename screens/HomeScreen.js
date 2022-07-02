import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React,{ useLayoutEffect, useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler'

import {auth, db} from '../firebase'
import { collection, getDocs, doc, query } from "firebase/firestore";
import CustomListItem from '../components/CustomListItem'
const tempPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3na8Ecqhy6F_OoizJeN3AvDhXsq5D7WkVQ&usqp=CAU"
const logoutIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY02laUiGBxHnxuzLQT_3upSoj07Zu_HEv-w&usqp=CAU"
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'


const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  //  useEffect(() => {
  //    async function fetchChats() {
  //      const querySnapshot = await getDocs(collection(db, "chats"));
  //      setChats(querySnapshot.map(doc => ({
  //        id: doc.id,
  //        data: doc.data(),
  //      })))
  //      console.log(doc.id, " => ", doc.data());
  //  }
    
  //   console.log(chats)
  //       return fetchChats;
  //   // return querySnapshot;
  // },[])
  // ^^^ This useEffect is not working. This is my stopping point for right now

useLayoutEffect(() => {
  navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <View style={{ marginLeft: 20}}>
       <TouchableOpacity onPress={ signOutUser } activeOpacity={0.5}>
        <Avatar
          rounded
          source={{ uri: tempPhotoUrl }}
          // ^^^ Need to change to match firebase "photoURL". Need to change components/CustomListItem to also be correct for now I'm using this avatar image url
         />
         <Text>Sign Out</Text>
         </TouchableOpacity>
      </View>,
        headerRight: () => (
             <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 80,
                marginRight: 20,

             }}>
                <TouchableOpacity activeOpacity={0.5}>
                  <AntDesign name='camerao' size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("AddChat")}
                >
                  <SimpleLineIcons name='pencil' size={24} color="black" />
                </TouchableOpacity>
             </View> 
        )
      // headerRight: () => <View style={{ marginLeft: 20}}>
      //     <TouchableOpacity onPress={ signOutUser } activeOpacity={0.5}>
      //   <Avatar
      //     // rounded
      //     source={{ uri: logoutIcon }}
      //     // ^^^ Need to change to match firebase "photoURL". Need to change components/CustomListItem to also be correct for now I'm using this avatar image url
      //    />
      //    <Text>Logout</Text>
      //    </TouchableOpacity>
      //    </View>
        // ^^^ Alternative Logout instead of Pencil && Camera icon on Home screens header ^^^
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