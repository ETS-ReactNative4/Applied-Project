import React from 'react'
import { Modal } from 'react-native'
import {
  ModalButton,
  ModalContainer,
  ModalView,
  StyledInput,
  ModalAction,
  ModalActionGroup,
  ModalIcon,
  HeaderTitle,
  colors,
} from './Styles'
import { AntDesign } from '@expo/vector-icons'

// takes a number of properties
const InputModal = ({
  modalVisible,
  setModalVisible,
  allergenInputValue,
  setAllergenInputValue,
  handleAddAllergen,
  allergenToBeEdited,
  setAllergenToBeEdited,
  handleEditAllergen,
  allergens,
}) => {
  // method that closes the modal
  const handleCloseModal = () => {
    // sets the visibilty to false
    setModalVisible(false)
    // sets the input value to an empty string
    setAllergenInputValue('')
    setAllergenToBeEdited(null)
  }

  // method that takes in two functions
  const handleSubmit = () => {
    // if the allergenToBeEdited is not set , add an allergen
    if (!allergenToBeEdited) {
      // handleAddAllergen must be the same format as the initial allergens
      handleAddAllergen({
        title: allergenInputValue,
        // key cant be the same as any other key
        // key needs to be a string
        // check if array is not empty
        // reduce the length by to give a valid index
        // use parseInt to convert to integer and increase it by one
        key: `${
          (allergens[allergens.length - 1] &&
            parseInt(allergens[allergens.length - 1].key) + 1) ||
          1
        }`,
      })
    } else {
      // edit allergen
      // pass in values
      handleEditAllergen({
        title: allergenInputValue,
        key: allergenToBeEdited.key,
        _id: allergenToBeEdited._id,
      })
    }

    setAllergenInputValue('')
  }

  return (
    <>
      <ModalButton onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={30} color={colors.tertiary} />
      </ModalButton>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalContainer>
          <ModalView>
            <ModalIcon>
              <HeaderTitle>Allergens</HeaderTitle>
            </ModalIcon>
            <StyledInput
              placeholder="Add allergen"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.secondary}
              onChangeText={(text) => setAllergenInputValue(text)}
              value={allergenInputValue}
              autoFocus={true}
              onSubmitEditing={handleSubmit}
            />
            <ModalActionGroup>
              <ModalAction onPress={handleCloseModal} color={colors.tertiary}>
                <AntDesign name="close" size={28} color={colors.secondary} />
              </ModalAction>
              <ModalAction onPress={handleSubmit} color={colors.tertiary}>
                <AntDesign name="check" size={28} color={colors.secondary} />
              </ModalAction>
            </ModalActionGroup>
          </ModalView>
        </ModalContainer>
      </Modal>
    </>
  )
}
export default InputModal
