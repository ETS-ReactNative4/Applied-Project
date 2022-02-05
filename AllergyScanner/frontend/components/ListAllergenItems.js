import React from 'react';
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

const ListAllergenItems = ({allergens, setAllergens}) => {
    return(
<SwipeListView
data={allergens}
renderItem={(data) => {
return(
    <ListView>
    <>
      <TodoText>{data.item.title}</TodoText>
    </>
  </ListView>
)
}}
/>
    )
}

export default ListAllergenItems;