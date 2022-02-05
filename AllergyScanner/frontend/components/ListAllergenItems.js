import React, {useState} from 'react';
import {Text} from 'react-native'
import { SwipeListView } from "react-native-swipe-list-view";
import {
    ListView,
    ListViewHidden,
    TodoText,
    TodoDate,
    HiddenButton,
    SwipedTodoText,
    colors,
  } from "./Styles";
  import { Entypo } from "@expo/vector-icons";

const ListAllergenItems = ({allergens, setAllergens}) => {

    const handleDeleteAllergen = (rowMap, rowKey) => {
        const newAllergens = [...allergens];
        const allergenIndex = allergens.findIndex((allergen) => allergen.key === rowKey);
        newAllergens.splice(allergenIndex, 1);
         setAllergens(newAllergens);
      };
    // For styling currently swiped todo row
  const [swipedRow, setSwipedRow] = useState(null);
    return(
        <>
        {allergens.length == 0 && <TodoText>You have not selected any allergens.</TodoText>}
        {allergens.length != 0 && (
<SwipeListView
data={allergens}
renderItem={(data) => {
    const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
return(
    <ListView  underlayColor={colors.primary}
    onPress={() => {
      
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
    // Handling swiped todo row
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