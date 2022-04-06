import React, { useState, useContext } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
// Styled components
import {
  ListView,
  ListViewHidden,
  AllergenText,
  HiddenButton,
  SwipedAllergenText,
  colors,
} from './Styles'
// Icons
import { Entypo } from '@expo/vector-icons'
// axios
import axios from 'axios'
// User Context
import { CredentialsContext } from './Context/CredentialsContext'

// method takes in four properties
const ListAllergenItems = ({
  allergens,
  setAllergens,
  handleTriggerEdit,
  loadAllergens,
}) => {
  // User credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  // For styling currently swiped allergen row
  const [swipedRow, setSwipedRow] = useState(null)

  // method to delete an allergen by id
  const handleDeleteAllergen = (rowMap, rowKey) => {
    // set allergens to a new allergen variable
    const newAllergens = [...allergens]
    // Use findIndex to find current allergen
    const allergenIndex = allergens.findIndex(
      (allergen) => allergen._id === rowKey,
    )
    // Once index is found, use spice to get rid of allergen
    newAllergens.splice(allergenIndex, 1)

    // variable that stores id of allergen and the current user
    const variable = {
      _id: rowKey,
      userFrom: storedCredentials,
    }

    // post request to remove an allergen by id
    axios
      .post('http://192.168.0.30:5000/allergens/removeAllergen', variable)
      .then((res) => console.log(res.data))
    // set allergen state to the new allergens
    setAllergens(newAllergens)
    loadAllergens()
    console.log('removed allergen from list')
  }

  return (
    <>
      {allergens.length == 0 && (
        <AllergenText>You have not selected any allergens.</AllergenText>
      )}
      {allergens.length != 0 && (
        <SwipeListView
          data={allergens}
          renderItem={(data) => {
            const RowText =
              data.item.key == swipedRow ? SwipedAllergenText : AllergenText
            return (
              <ListView
                underlayColor={colors.primary}
                onPress={() => {
                  handleTriggerEdit(data.item)
                }}
              >
                <>
                  <RowText>{data.item.title}</RowText>
                </>
              </ListView>
            )
          }}
          // renders hidden button to delete an item by id when you swipe
          renderHiddenItem={(data, rowMap) => (
            <ListViewHidden>
              <HiddenButton
                onPress={() => handleDeleteAllergen(rowMap, data.item._id)}
              >
                <Entypo name="trash" size={25} color={colors.secondary} />
              </HiddenButton>
            </ListViewHidden>
          )}
          leftOpenValue={80}
          previewRowKey={'1'}
          previewOpenValue={80}
          previewOpenDelay={3000}
          disableLeftSwipe={true}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingBottom: 30, marginBottom: 40 }}
          // Handling swiped allergen row
          onRowOpen={(rowKey) => {
            setSwipedRow(rowKey)
          }}
          onRowClose={() => {
            setSwipedRow(null)
          }}
        />
      )}
    </>
  )
}
export default ListAllergenItems
