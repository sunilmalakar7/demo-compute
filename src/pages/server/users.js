import React, { useEffect, useState } from 'react'

const ServerUsersPage = ({data})=> {

  return (
    <div>
        <h2> Server Side Rendering </h2>
        {
            data?.map((item, key) => (<div key={key}> {item.title} </div>))
        }
    </div>
  )
}

export const getServerSideProps = async () => {
    let data = await (await fetch("https://jsonplaceholder.typicode.com/todos")).json();
    return {
        props: {
            data
        }
    }
}

export default ServerUsersPage
