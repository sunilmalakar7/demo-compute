import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ClientUserPage = () => {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const id = router.query.id;

    console.log("id", id)
    useEffect(() => {
        (async () => {
            if(id){

                setIsLoading(true)
                let data = await (await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)).json();
                setIsLoading(false)
                console.log("data", data)
                setData(data);
            }
        })()
    }, [id])

    if (isLoading) return <h2> Loading Data.... </h2>

    return (
        <div>
            Title is {data?.title}
        </div>
    )
}

export default ClientUserPage
