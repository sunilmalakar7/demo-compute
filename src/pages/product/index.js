import { useEffect, useRef, useState } from 'react';
import data from './data.json'

const Product = () => {

  // const [selectedProduct, setSelectedProduct] = useState({})

  // useEffect(() => {
  //   console.log({ data })
  //   setSelectedProduct(data.filter((item) => item?.products?.length > 0)[0])
  // }, [])

  const ref = useRef();

  useEffect(() => {

    const observer = new IntersectionObserver(([entry]) => {
      console.log("called", entry);
      console.log(entry.isIntersecting)
      console.log(entry.intersectionRatio)
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };

  }, [])

  return (
    <div className='' ref={ref}>
      <h4 style={{ textAlign: "center" }}> You May Also Like </h4>

      {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {
          data.map((item, index) => {
            if (item?.products.length > 0) {
              return (
                <button key={index} onClick={() => setSelectedProduct(item)}>
                  <h6 style={{ color: selectedProduct.type === item.type ? "red" : "black" }} > {item?.title}</h6>
                </button>
              )
            }
          })
        }
      </div> */}

      {/* <div>
        {
          selectedProduct?.products?.map((item, index) => {
            return (
              <div key={index}>
                <h6> {item?.variantId} </h6>
              </div>
            )
          })
        }
      </div> */}

    </div>
  );

};

export default Product;
