import { Button, StyleSheet, View } from 'react-native'
import { Table } from './components/Table/Table'
import { store } from './Store/store'

import { useAppDispatch, useAppSelector } from './Store/Hooks/hook'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <MainContent />
      </Provider>
    </>
  )
}
function MainContent() {
  return (
    <View style={styles.container}>
      <Table />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
