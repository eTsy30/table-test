import React from 'react'
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageRangeDisplayed = 5
  const breakLabel = '...'
  const firstPage = 1
  const lastPage = totalPages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleGoToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPagination = () => {
    const pageButtons = []

    if (totalPages <= pageRangeDisplayed) {
      for (let i = firstPage; i <= lastPage; i++) {
        pageButtons.push(
          <Button
            key={uuidv4()}
            title={i.toString()}
            onPress={() => handleGoToPage(i)}
            color={i === currentPage ? 'blue' : undefined}
          />
        )
      }
    } else {
      const leftOffset = Math.floor(pageRangeDisplayed / 2)
      const rightOffset = lastPage - leftOffset

      if (currentPage <= leftOffset) {
        for (let i = firstPage; i <= pageRangeDisplayed; i++) {
          pageButtons.push(
            <Button
              key={uuidv4()}
              title={i.toString()}
              onPress={() => handleGoToPage(i)}
              color={i === currentPage ? 'blue' : undefined}
            />
          )
        }
      } else if (currentPage >= rightOffset) {
        for (let i = lastPage - pageRangeDisplayed + 1; i <= lastPage; i++) {
          pageButtons.push(
            <Button
              key={uuidv4()}
              title={i.toString()}
              onPress={() => handleGoToPage(i)}
              color={i === currentPage ? 'blue' : undefined}
            />
          )
        }
      } else {
        for (
          let i = currentPage - leftOffset;
          i <= currentPage + leftOffset;
          i++
        ) {
          pageButtons.push(
            <Button
              key={uuidv4()}
              title={i.toString()}
              onPress={() => handleGoToPage(i)}
              color={i === currentPage ? 'blue' : undefined}
            />
          )
        }
      }
    }

    return pageButtons
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        gap: 2,
        marginBottom: 40,
        width: 'auto',
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={handlePrevPage}
        disabled={currentPage < 2}
      >
        <Text style={{ color: 'black' }}>Назад</Text>
      </TouchableOpacity>

      {currentPage <= firstPage + 2 || (
        <Button title="1" onPress={() => handleGoToPage(1)} />
      )}
      {renderPagination()}
      {currentPage >= lastPage - 2 || (
        <Button
          onPress={() => handleGoToPage(lastPage)}
          title={lastPage.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        disabled={currentPage === totalPages}
        onPress={handleNextPage}
      >
        <Text style={{ color: 'black' }}>Далее</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: 'blue',
  },
  green: {
    color: 'green',
  },
})
export default Pagination
