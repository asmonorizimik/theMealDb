
import './App.css';
import React, {useEffect,useState} from 'react'
const _=require('lodash')
function App() {
  const [data,setData]  = useState([])
  const [search, setSearch] = useState();
  const [searchData,setSearchData]=useState([])
  const [myCart,setMyCart]=useState([])
  
  const getData=async()=>{
    const Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    const Result = await Response.json();
    setData(Result.meals)
    // console.log(data)
  }



  // const searchData = !search ? data:data.filter((item) =>
  //      item.strCategory.toLowerCase().includes(search.toLowerCase())||item.strMeal.toLowerCase().includes(search.toLowerCase())
  //   );


  useEffect(()=>{
    getData()
  },[])
  console.log(data)
  
  const searchFunction=()=>{
    if (search.length>3){
      let searchItem =_.filter(data,{"strCategory":search})
      setSearchData(searchItem)
    }
  }


  return (

    <div className='app'>
      <h1>Welcome to TheMealDB</h1>
    <input type='text' placeholder='type here...' onChange={(event)=>{
        setSearch(event.target.value)
        searchFunction()
      }}></input>
     

    <div className="main">
      {
        search ? searchData.map((item,index)=>{
          return (
            <div className='item-display'>
              <img src={item.strMealThumb} alt=''></img>
              <p>Category : {item.strCategory}</p>
              <p>{item.strMeal}   <button>10$</button>   <button>add to cart</button></p>
              
            </div>
          )
        })
      :data.map((item,index)=>{
        return (
          <div className='item-display'>
            <img src={item.strMealThumb} alt=''></img>
            <p>Category : {item.strCategory}</p>
            <p>{item.strMeal}   <button>10$</button>   <button onclick = {()=>{
              let newData=[...myCart]
              newData.push(item)
              setMyCart(newData)
              console.log(myCart)
            }}>add to cart</button></p>
            
          </div> 
        )
      })
      }
    </div>
    </div>
  );
}

export default App;
