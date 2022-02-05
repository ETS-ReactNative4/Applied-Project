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

const Header = () => {
  return (
    <HeaderView>
      <HeaderTitle>Allergens</HeaderTitle>
      <HeaderButton>
        <Entypo name="trash" size={25}  />
      </HeaderButton>
    </HeaderView>
  );
};

export default Header;