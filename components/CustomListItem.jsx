import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Avatar } from 'react-native-elements'

import {
  collection,
  // getFirestore,
  onSnapshot,
  query,
  orderBy,
  db,
} from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([])

    useEffect(() =>
    onSnapshot(
      query(
        collection(db, `chats/${id}`, 'messages'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
      }
    )
  )

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 800 }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

//   return (
//     <ListItem onPress={() => enterChat( id, chatName )} key={ id } bottomDivider>
//         <Avatar
//             rounded
//             source={{
//              uri:
//              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3na8Ecqhy6F_OoizJeN3AvDhXsq5D7WkVQ&usqp=CAU"
//             }}
//         />
//         <ListItem.Content>
//             <ListItem.Title style={{ fontWeight: '800'}}>
//               { chatName }
//             </ListItem.Title>

//           <ListItem.Subtitle 
//             numberOfLines={1}
//             ellipsizeMode="tail"
//           >
//             This is a test subtitle that will eventually run off the screen and create trailing dots but it's just for testing
//           </ListItem.Subtitle>

//         </ListItem.Content>
//     </ListItem>
//   )
// }

export default CustomListItem

const styles = StyleSheet.create({})