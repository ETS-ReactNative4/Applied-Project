import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Modal } from 'react-native'

const ScanModal = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible)

  return (
    <Modal transparent visible={true}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})

export default ScanModal
