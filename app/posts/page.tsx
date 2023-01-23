import React from 'react'
// import GetPosts from './getPosts'
import LoadMorePosts from './postWithLoadMore'

function Posts() {
  return (
    <div>
      {/* @ts-ignore */}
      {/* <GetPosts /> */}
      <LoadMorePosts />
    </div>
  )
}

export default Posts