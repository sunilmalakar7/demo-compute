import React from 'react'

const StaticUser = ({data}) => {
  return (
    <div>
        Title is - {data?.title}
    </div>
  )
}

export default StaticUser


export const getStaticPaths = async () => {

    let data = await (await fetch(`https://jsonplaceholder.typicode.com/todos`)).json();

    const userIds = data.map((item) => item.id);
    return {
      paths: userIds.map((item) => ({params: { id: `${item}` }})),
      fallback: false, // false or "blocking"
    }
  }


export const getStaticProps = async (context) => {
    let id = context.params.id;
    let data = await (await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)).json();

    console.log(data);
    return {
        props: {
            data
        }
    }
}

