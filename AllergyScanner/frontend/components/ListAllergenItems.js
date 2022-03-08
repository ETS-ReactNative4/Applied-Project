import React, {useState} from 'react';
import {Text} from 'react-native'
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
  // Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";


const ListAllergenItems = ({allergens, setAllergens, handleTriggerEdit,loadAllergens}) => {
  const handleDeleteAllergen = (rowMap, rowKey) => {
    const newAllergens = [...allergens];
    const allergenIndex = allergens.findIndex((allergen) => allergen.key === rowKey);
    newAllergens.splice(allergenIndex, 1);

    AsyncStorage.setItem("storedAllergens", JSON.stringify(newAllergens))
      .then(() => {
        setAllergens(newAllergens);
      })
      .catch((error) => console.log(error));
      loadAllergens();
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
      <HiddenButton onPress={() => handleDeleteAllergen(rowMap, data.item.key)}
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