import React, { useState, useContext, useEffect } from 'react'
import { Container } from '../components/Styles'
// List allergen items component
import ListAllergenItems from '../components/ListAllergenItems'
// Input modal component
import InputModal from '../components/InputModal'
// Allergens context
import { useAllergens } from '../components/Context/AllergenContext'
// User context
import { CredentialsContext } from '../components/Context/CredentialsContext'
// Header component
import AllergenHeader from '../components/Headers/AllergenHeader'
import { StatusBar } from 'react-native'
// axios
import axios from 'axios'

const PickAllergens = () => {
  // Modal visibility
  const [modalVisible, setModalVisible] = useState(false)
  // Input value
  const [allergenInputValue, setAllergenInputValue] = useState()
  // user credentials
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const { allergens, setAllergens, loadAllergens } = useAllergens()

  // edit existing allergen item
  const [allergenToBeEdited, setAllergenToBeEdited] = useState(null)

  useEffect(() => {
    // finds the allergens when the page loads
    loadAllergens()
  }, [])

  // clear all allergens
  const handleClearAllergens = () => {
    // post request  to delete the allergens in the list
    axios
      .post('http://192.168.0.30:5000/allergens/removeAll', {
        userFrom: storedCredentials,
      })
      .then((response) => {
        if (response.data.success) {
          // set the allergen state to an empty array
          setAllergens([])
          loadAllergens()
          console.log('Removed all allergens from list')
        } else {
          alert('Failed to get allergens')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // function to add new allergen
  const handleAddAllergen = (allergen) => {
    const newAllergens = [...allergens, allergen]

    // variable that stores the title and key allergen, and the current user
    const variable = {
      userFrom: storedCredentials,
      title: allergen.title,
      key: allergen.key,
    }
    // post request to add an allergen
    axios
      .post('http://192.168.0.30:5000/allergens/addAllergens', variable)
      .then((res) => {
        // sets the allergen state to the new allergens
        setAllergens(newAllergens)
        // sets the modal to false
        setModalVisible(false)
        loadAllergens()
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Editing
  const handleTriggerEdit = (item) => {
    // store the item to be edited in state
    setAllergenToBeEdited(item)
    // set visibilty to true
    setModalVisible(true)
    // set the value of input field to the title
    setAllergenInputValue(item.title)
  }

  // Method to edit an allergen
  const handleEditAllergen = (editedAllergen) => {
    // set allergens to a new allergen variable
    const newAllergens = [...allergens]
    // find position of the current allergen to be edited and replace it with the edited allergen
    const allergenIndex = allergens.findIndex(
      (allergen) => allergen._id === editedAllergen._id,
    )
    newAllergens.splice(allergenIndex, 1, editedAllergen)

    // stores the title, key and the current user
    const variable = {
      userFrom: storedCredentials,
      title: editedAllergen.title,
      key: editedAllergen.key,
    }
    // put request to edit allergen
    axios
      .put(
        `http://192.168.0.30:5000/allergens/editAllergens/${editedAllergen._id}`,
        variable,
      )
      .then((res) => {
        // set allergen state to new allergens
        setAllergens(newAllergens)
        // set the allergen to be edited to null
        setAllergenToBeEdited(null)
        // set the visibilty to false
        setModalVisible(false)
        loadAllergens()
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // passes values to input modal component and list allergen items
  return (
    <>
      <AllergenHeader
        titleText="Allergens"
        handleClearAllergens={handleClearAllergens}
      />
      <Container>
        <ListAllergenItems
          allergens={allergens}
          setAllergens={setAllergens}
          loadAllergens={loadAllergens}
          handleTriggerEdit={handleTriggerEdit}
        />
        <InputModal
          allergenInputValue={allergenInputValue}
          setAllergenInputValue={setAllergenInputValue}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleAddAllergen={handleAddAllergen}
          allergens={allergens}
          allergenToBeEdited={allergenToBeEdited}
          setAllergenToBeEdited={setAllergenToBeEdited}
          handleEditAllergen={handleEditAllergen}
        />
        <StatusBar hidden />
      </Container>
    </>
  )
}
export default PickAllergens
