import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../Store/store'
import { IPost } from '../../Store/Slice/postsSlice'

export const Table = () => {
  const posts = useSelector((state: IPost) => state)

  console.log(posts, 'dfdfd')

  return (
    <Text style={styles.container} onPress={() => console.log('dfdfd')}>
      работает
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e60808',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 55,
  },
})
