import React from 'react'


const Comments = ( {commentList} ) => {
  if(typeof(commentList) === 'undefined' ) return null
  return (
    <div>
      <ul >
        {commentList.map( c => <li key={c.id}>c.content</li>)}
      </ul>
    </div>
  )
}