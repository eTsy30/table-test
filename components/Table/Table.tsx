import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
import { useAppDispatch } from '../../Store/Hooks/hook'

import Pagination from '../Pagination/Pagination'
import {
  fetchPosts,
  setData,
  setSearchData,
  setSortData,
} from '../../Store/Slice/postsSlice'

export const Table = () => {
  const dispatch = useAppDispatch()
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: 'ascending' | 'descending'
  }>({
    key: 'null',
    direction: 'ascending',
  })

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const posts = useSelector((state: RootState) => state.postsSlice)
  const firstObjectKeys = posts.data[0] && Object.keys(posts.data[0])
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = currentPage * itemsPerPage

    dispatch(setData(posts.data.slice(startIndex, endIndex)))
  }, [currentPage, posts.data, searchText])

  const totalPages = Math.ceil(posts.data.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = () => {
    dispatch(setSearchData(searchText.toLowerCase()))
  }

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'

    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }

    setSortConfig({ key, direction })
    const sortedKey = key as 'id' | 'title' | 'body'
    dispatch(
      setSortData({
        key: sortedKey,
        direction,
        displayedData: posts.displayedData,
      })
    )
  }
  if (!posts.displayedData) return <View>Loading...</View>
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Поиск"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={handleSearch}
          color={'rgb(164, 164, 164)'}
        />
      </View>
      <FlatList
        data={posts.displayedData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: 'rgb(66, 66, 66)',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {firstObjectKeys &&
              firstObjectKeys.map((key, index) => (
                <TouchableOpacity
                  style={[
                    styles.cell,
                    index === firstObjectKeys.length - 1 && { flex: 10 },
                    index === 1 && { flex: 3 },
                  ]}
                  key={key}
                  onPress={() => handleSort(key)}
                >
                  <Text style={[styles.cellText, { color: 'white' }]}>
                    {key}
                    {sortConfig.key === key &&
                      (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.cell, { flex: 1 }]}>
              <Text style={styles.cellText}>{item.id}</Text>
            </View>
            <View style={[styles.cell, { flex: 3 }]}>
              <Text style={styles.cellText}>{item.title}</Text>
            </View>
            <View style={[styles.cell, { flex: 10 }]}>
              <Text style={styles.cellText}>{item.body}</Text>
            </View>
          </View>
        )}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderColor: 'rgb(66, 66, 66)',
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 1,
  },
  cellText: {
    textAlign: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    padding: 10,
    backgroundColor: 'grey',
  },
  input: {
    width: '60%',
    height: 25,
    padding: 5,
    color: 'white',
  },
  buttonSearch: {
    backgroundColor: 'rgb(128, 128, 128)',
  },
  container: {
    marginTop: 50,
  },
})
