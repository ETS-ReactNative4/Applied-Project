import React from "react";
import { Modal } from "react-native";
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
} from "./Styles";

import { AntDesign } from "@expo/vector-icons";


const InputModal = ({modalVisible,
    setModalVisible, allergenInputValue,setAllergenInputValue}) => {

        const handleCloseModal = () => {
            setModalVisible(false);
          };

          const handleSubmit = () => {

          }
        
    return(
        <>
        <ModalButton onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={30} color={colors.secondary} />
        </ModalButton>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >

      <ModalContainer>
            <ModalIcon>
             
              <AntDesign name="edit" size={30} color={colors.tertiary} />
            </ModalIcon>

            <StyledInput
             placeholder="Add allergen"
             placeholderTextColor={colors.alternative}
             selectionColor={colors.secondary}
             onChangeText={(text) => setAllergenInputValue(text)}
             value={allergenInputValue}
             autoFocus={true}
             onSubmitEditing={handleSubmit}/>
            </ModalContainer>
            </Modal>
        </>
    );
}

export default InputModal;