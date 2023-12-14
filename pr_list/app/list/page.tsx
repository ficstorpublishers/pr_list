'use client';
import styles from './list.module.css'
import { useState, useEffect } from 'react'

let prUrl = 'https://dummyjson.com/products'
let prSkip = 0
let prLimit = 30
let canPreviousPage = false
let canNextPage = false


export default  function List() {

  const [prlistData, setPrlistData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(prUrl + '?skip='+prSkip + '&limit=' + prLimit)
    .then((res) => res.json())
    .then((prdata) => {
      setPrlistData(prdata)
      if(prdata && prdata.total > prSkip+prLimit){
        canNextPage = true
      }else {
        canNextPage = false
      }
      setLoading(false)
    })
  }, [])

  function getList() {
    fetch(prUrl + '?skip='+prSkip + '&limit=' + prLimit)
      .then((res) => res.json())
      .then((data) => {
        setPrlistData(data)
        setLoading(false)
      })
  }
  
   async function getListData() {
    await getList()
    if(prlistData.total > prSkip+prLimit){
      canNextPage = true
    }else {
      canNextPage = false
    }
    if(prSkip > 0){
      canPreviousPage = true
    }else {
      canPreviousPage = false
    }
  }
  
   async function previousPage() {
    if(prSkip > 0){
      prSkip = prSkip - prLimit
      await getListData()
    }
  }
   async function nextPage() {
    if(prlistData.total > prSkip+prLimit){
      prSkip = prSkip + prLimit
      await getListData()
    }
  }



  if (isLoading) return <p>Loading...</p>
  if (!prlistData) return <p>No Products data</p>

  const productItems = prlistData.products.map( product =>
    <li className={styles.listitem} key={product.id}>
      <img
        src={product.thumbnail}
        width={60}
        height={60}
        alt= {product.title}/>
      <p className={styles.itemdesc}>
        <b>{'Product Name : ' + product.title +' , '}</b>
        <b>{' Price : $' + product.price + ' '}</b>
        <br></br>
        <b>{' Brrand :' + product.brand +' , '}</b>
        <b>{' Discount : ' + product.discountPercentage + '%'}</b>
        <br></br>
        <b>{' Details : ' + product.description }</b>
      </p>
    </li>
  );

  return (
    <main className={styles.list}>
      <h1 className={styles.prhead}>Product List</h1>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {prSkip+1} to {prSkip+prLimit > prlistData.total ? prlistData.total : prSkip+prLimit} of {prlistData.total}
          </strong>{" "}
        </span>
      </div>
      <ul className={styles.prlist}>{productItems}</ul>
    </main>
  )
}
