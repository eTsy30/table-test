import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Button,
  TextInput,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
import { IPost, fetchPosts } from '../../Store/Slice/postsSlice'
import { useAppDispatch } from '../../Store/Hooks/hook'
import { log } from 'console'

export const Table = () => {
  const dispatch = useAppDispatch()

  const posts = useSelector((state: RootState) => state.postsReducer)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const firstObjectKeys = posts.data[0] && Object.keys(posts.data[0])
  /////////////////////////////////////////
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [currentData, setCurrentData] = useState<any>()
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = currentPage * itemsPerPage
  const displayedData = posts.data.slice(startIndex, endIndex)

  // setCurrentData(displayedData ? displayedData : [])

  // console.log(currentData, 'displayedData')

  const totalPages = Math.ceil(posts.data.length / itemsPerPage)
  const pageRangeDisplayed = 5
  const breakLabel = '...'
  const lastPage = totalPages
  const pageButtons = []
  const firstPage = 1
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleGoToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleSearch = () => {
    const filteredData = displayedData.filter((item) =>
      item.body.includes(searchText)
    )
    // setCurrentData(filteredData)
  }

  const renderPagination = () => {
    const pageButtons = []
    const firstPage = 1

    if (totalPages <= pageRangeDisplayed) {
      for (let i = firstPage; i <= lastPage; i++) {
        pageButtons.push(
          <Button
            key={i}
            title={i.toString()}
            onPress={() => handleGoToPage(i)}
            color={i === currentPage ? 'blue' : undefined}
          />
        )
      }
    } else {
      const leftOffset = Math.floor(pageRangeDisplayed / 2)
      const rightOffset = totalPages - leftOffset

      if (currentPage <= leftOffset) {
        for (let i = firstPage; i <= pageRangeDisplayed; i++) {
          pageButtons.push(
            <Button
              key={i}
              title={i.toString()}
              onPress={() => handleGoToPage(i)}
              color={i === currentPage ? 'blue' : undefined}
            />
          )
        }
        pageButtons.push(<Text key="break">{breakLabel}</Text>)
      } else if (currentPage >= rightOffset) {
        pageButtons.push(<Text key="break">{breakLabel}</Text>)
        for (let i = lastPage - pageRangeDisplayed + 1; i <= lastPage; i++) {
          pageButtons.push(
            <Button
              key={i}
              title={i.toString()}
              onPress={() => handleGoToPage(i)}
              color={i === currentPage ? 'blue' : undefined}
            />
          )
        }
      } else {
        pageButtons.push(<Text key="break">{breakLabel}</Text>)
        for (
          let i = currentPage - leftOffset;
          i <= currentPage + leftOffset;
          i++
        ) {
          pageButtons.push(
            <Button
              key={i}
              title={i.toString()}
              onPress={() => handleGoToPage(i)}
              color={i === currentPage ? 'blue' : undefined}
            />
          )
        }
        pageButtons.push(<Text key="break">{breakLabel}</Text>)
      }
    }

    return pageButtons
  }
  console.log(displayedData, 'edcedcedc')
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
        data={displayedData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
            {firstObjectKeys &&
              firstObjectKeys.map((i, index) => {
                return (
                  <View
                    style={[
                      styles.cell,
                      index === firstObjectKeys.length - 1 && { flex: 5 },
                    ]}
                  >
                    <Text style={[styles.cellText, { color: 'white' }]}>
                      {i}
                    </Text>
                  </View>
                )
              })}
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
      <View style={styles.pagination}>
        <Button
          title="< Previous"
          onPress={handlePrevPage}
          disabled={currentPage < 3}
        />{' '}
        {currentPage <= lastPage + 2 || (
          <Button title="1" onPress={() => handleGoToPage(1)} />
        )}
        {renderPagination()}
        {currentPage >= lastPage - 2 || (
          <Button
            title={lastPage.toString()}
            onPress={() => handleGoToPage(lastPage)}
          />
        )}
        <Button
          title="Next >"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </View>
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
    borderWidth: 1, // Border width
    borderLeftWidth: 1,
  },
  cellText: {
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
})
