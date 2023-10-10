import { Button, StyleSheet, View } from 'react-native'
import { Table } from './components/Table/Table'
import { store } from './Store/store'

import { useAppDispatch, useAppSelector } from './Store/Hooks/hook'
import { setBurgerActive } from './Store/Slice/TableSlice'
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
  const dispatch = useAppDispatch()
  const message = useAppSelector((state) => state.isActiveBurger.value)

  const handlePress = () => {
    dispatch(setBurgerActive(!message))
    console.log('we')
  }
  console.log(message)

  return (
    <View style={styles.container}>
      {message && <Table />}
      <Button title={'Установить сообщение'} onPress={handlePress} />
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
