import React, { useEffect, useState } from 'react'

const UsersPage = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
    (async () => {

        
        setIsLoading(true)
        let data = await (await fetch("https://jsonplaceholder.typicode.com/todos")).json();
        setIsLoading(false)
        console.log("data", data)
        setData(data);
    })()
   }, []) 
   
   if(isLoading) return <h2> Loading Data.... </h2>

  return (
    <div>
        {
            data.map((item, key) => (<div key={key}> {item.title} </div>))
        }
    </div>
  )
}

export default UsersPage
