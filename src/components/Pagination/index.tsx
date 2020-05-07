import React from 'react'
import './pagination.css'

type Props = {
  pageCount: number,
  currentPageId: number,
  displayPages: number,
  onPageChanged: (selected: number) => void
}
const Pagination: React.FC<Props> = ({ pageCount, currentPageId, onPageChanged, displayPages }) => {
  const pagesNumbers: number[] = []
  for (let i = 0; i < pageCount; i++) pagesNumbers.push(i)

  let start = currentPageId - Math.floor(displayPages / 2)
  if (start <= 0) {
    start = 0
  } else if (start + displayPages > pageCount) {
    start = pageCount - displayPages
  }

  const pages: number[] = pagesNumbers.slice(start, start + displayPages)

  const handlePageIncrement = (event: React.MouseEvent) => {
    event.preventDefault()
    if (currentPageId < pageCount - 1) {
      onPageChanged(currentPageId + 1)
    }
  }
  const handlePageDecrement = (event: React.MouseEvent) => {
    event.preventDefault()
    if (currentPageId > 0) {
      onPageChanged(currentPageId - 1)
    }
  }
  const handleSelectPage = (pageId: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    if (pageId !== currentPageId) {
      onPageChanged(pageId)
    }
  }

  return (
    <ul className='pagination'>
      <li className={currentPageId === 0 ? 'disabled' : ''}><a href='/' onClick={handlePageDecrement}>{'<'}</a></li>

      {
        pages.map(page => {
          return <li key={page} className={page === currentPageId ? 'active' : ''}><a href='/' onClick={handleSelectPage(page)}>{page + 1}</a></li>
        })
      }

      <li className={currentPageId === pageCount - 1 ? 'disabled' : ''}><a href='/' onClick={handlePageIncrement}>{'>'}</a></li>
    </ul>
  )
}

export default Pagination