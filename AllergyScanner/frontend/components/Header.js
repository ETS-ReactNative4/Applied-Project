import React from "react";

// styled components
import {
  HeaderView,
  HeaderTitle,
  HeaderButton,
  colors,
} from "../components/Styles";

// Icons
import { Entypo } from "@expo/vector-icons";

const Header = ({handleClearAllergens}) => {
  return (
    <HeaderView>
      <HeaderTitle>Allergens</HeaderTitle>
      <HeaderButton onPress={handleClearAllergens}>
        <Entypo name="trash" size={25}  />
      </HeaderButton>
    </HeaderView>
  );
};

export default Header;