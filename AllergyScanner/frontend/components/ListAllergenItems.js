import React, { useState } from 'react';
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

const ListAllergenItems = ({ allergens, setAllergens, handleTriggerEdit }) => {

  // For styling currently swiped allergen row
  const [swipedRow, setSwipedRow] = useState(null);

  const handleDeleteAllergen = (rowMap, rowKey) => {
    const newAllergens = [...allergens];
    const allergenIndex = allergens.findIndex((allergen) => allergen.key === rowKey);
    newAllergens.splice(allergenIndex, 1);
    setAllergens(newAllergens);
  };

  return (
    <>
    {allergens.length == 0 && <AllergenText>You have no todos today</AllergenText>}
    {allergens.length != 0 && 
      <SwipeListView
        data={allergens}
        renderItem={(data) => {
          const RowText =
            data.item.key == swipedRow ? SwipedAllergenText : AllergenText;
          return (
            <ListView
              underlayColor={colors.primary}
              onPress={() => {
                handleTriggerEdit(data.item);
              }}
            >
              <>
                <RowText>{data.item.title}</RowText>
              </>
            </ListView>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          return(
          <ListViewHidden>
            <HiddenButton
              onPress={() => handleDeleteAllergen(rowMap, data.item.key)}
            >
              <Entypo name="trash" size={25} color={colors.secondary} />
            </HiddenButton>
          </ListViewHidden>
          )
        }}
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
      
      
  />}
  </>
      )};

export default ListAllergenItems;