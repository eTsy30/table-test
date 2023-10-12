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
import { IPost, fetchPosts } from '../../Store/Slice/getPostsSlice'

export const Table = () => {
  const dispatch = useAppDispatch()
  const [displayedData, setDisplayedData] = useState<any>([])
  const [sortConfig, setSortConfig] = useState<any>({
    key: null,
    direction: 'ascending',
  })

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const posts = useSelector((state: RootState) => state.getPostsSlice)

  const firstObjectKeys = posts.data[0] && Object.keys(posts.data[0])
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = currentPage * itemsPerPage
    setDisplayedData(posts.data.slice(startIndex, endIndex))
  }, [currentPage, posts.data])

  const totalPages = Math.ceil(posts.data.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = () => {
    const filteredData = displayedData.filter(
      (item: IPost) =>
        item.body.includes(searchText) || item.title.includes(searchText)
    )
    setDisplayedData(filteredData)
  }

  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  const sortedData = [...displayedData]

  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
      />{' '}
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
            {firstObjectKeys &&
              firstObjectKeys.map((key, index) => (
                <TouchableOpacity
                  style={[
                    styles.cell,
                    index === firstObjectKeys.length - 1 && { flex: 5 },
                  ]}
                  key={key}
                  onPress={() => requestSort(key)}
                >
                  <Text style={[styles.cellText, { color: 'white' }]}>
                    {key}
                    {getClassNamesFor(key) === 'ascending' ? ' ↑' : ' ↓'}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={[styles.cellText, { flex: 0 }]}>{item.userId}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{item.id}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{item.title}</Text>
            </View>
            <View style={[styles.cell, { flex: 5 }]}>
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
    borderColor: 'black',
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 1,
  },
  cellText: {
    textAlign: 'center',
  },
})
