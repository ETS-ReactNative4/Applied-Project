import React, {useState, useContext} from 'react';
import { SwipeListView } from "react-native-swipe-list-view";
import {
    ListView,
    ListViewHidden,
    AllergenText,
    HiddenButton,
    SwipedAllergenText,
    colors,
  } from "./Styles";
  import { Entypo } from "@expo/vector-icons";
  import axios from 'axios'
import {CredentialsContext} from './Context/CredentialsContext';

const ListAllergenItems = ({allergens, setAllergens, handleTriggerEdit,loadAllergens}) => {
  const { storedCredentials, setStoredCredentials } = useContext(
    CredentialsContext,
  )
  const handleDeleteAllergen = (rowMap, rowKey) => {
    const newAllergens = [...allergens];
    const allergenIndex = allergens.findIndex((allergen) => allergen._id === rowKey);
    newAllergens.splice(allergenIndex, 1);

    const variable = {
      _id: rowKey,
      userFrom: storedCredentials
    }

    axios.post('http://192.168.0.30:5000/allergens/removeAllergen', variable)
    .then(res => console.log(res.data))
    setAllergens(newAllergens);
    loadAllergens();
    console.log('removed product')

  };
  
    // For styling currently swiped allergen row
  const [swipedRow, setSwipedRow] = useState(null);
    return(
      
          
        <>
        
        {allergens.length == 0 && <AllergenText>You have not selected any allergens.</AllergenText>}
        {allergens.length != 0 && (
<SwipeListView
data={allergens}
renderItem={(data) => {
    const RowText = data.item.key == swipedRow ? SwipedAllergenText : AllergenText;
return(
  
    <ListView  underlayColor={colors.primary}
    onPress={() => {
      handleTriggerEdit(data.item);
    }}>
    <>
      <RowText>{data.item.title}</RowText>
    </>
  </ListView>
)
}}

renderHiddenItem={(data, rowMap) => (
    <ListViewHidden>
      <HiddenButton onPress={() => handleDeleteAllergen(rowMap, data.item._id)}
      >
        <Entypo name="trash" size={25} color={colors.secondary} />
      </HiddenButton>
    </ListViewHidden>
  )}
    leftOpenValue={80}
    previewRowKey={"1"}
    previewOpenValue={80}
    previewOpenDelay={3000}
    disableLeftSwipe={true}
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, paddingBottom: 30, marginBottom: 40 }}
        
    // Handling swiped allergen row
    onRowOpen={(rowKey) => {
        setSwipedRow(rowKey);
      }}
      onRowClose={() => {
        setSwipedRow(null);
      }}
/>
    )}
    </>
                     
    
    )
}
export default ListAllergenItems;