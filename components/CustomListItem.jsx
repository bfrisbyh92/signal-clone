import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem key={ id } bottomDivider>
        <Avatar
            rounded
            source={{
             uri:
             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3na8Ecqhy6F_OoizJeN3AvDhXsq5D7WkVQ&usqp=CAU"
            }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '800'}}>
              { chatName }
            </ListItem.Title>

          <ListItem.Subtitle 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            This is a test subtitle that will eventually run off the screen and create trailing dots but it's just for testing
          </ListItem.Subtitle>

        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})