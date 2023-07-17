import React, { useEffect, useState } from 'react'

const StaticUserPage = ({data})=> {
  return (
    <div>
        <h2> Static Page Rendering </h2>
        {
            data?.map((item, key) => (<div key={key}> {item.title} </div>))
        }
    </div>
  )
}

export const getStaticProps = async () => {
    let data = await (await fetch("https://jsonplaceholder.typicode.com/todos")).json();

    console.log(data);
    return {
        props: {
            data
        }
    }
}

export default StaticUserPage
