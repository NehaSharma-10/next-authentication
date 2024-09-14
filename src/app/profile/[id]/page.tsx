import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div className='pt-5 flex flex-col  justify-center items-center'>
      <p>
      Profile Description Page</p>  
      <span>{params.id}</span>
    </div>
  )
}

export default UserProfile
