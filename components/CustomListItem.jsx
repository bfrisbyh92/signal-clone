import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = () => {
  return (
    <ListItem>
        <Avatar
            rounded
            source={{
             uri:
             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR3na8Ecqhy6F_OoizJeN3AvDhXsq5D7WkVQ&usqp=CAU"
            }}
        />
        <ListItem.Content style={{ fontWeight: '800'}}>
            <Text>Signal-Clone</Text>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})