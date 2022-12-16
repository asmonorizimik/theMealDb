
import './App.css';
import React, {useEffect,useState} from 'react'
function App() {
  const [data,setData]  = useState([])
  const [search, setSearch] = useState();
  const [addCart,setAddCart]=useState(0)
  const [myCart,setMyCart]=useState([])
  
  const getData=async()=>{
    const Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    const Result = await Response.json();
    setData(Result.meals)
  }



  const searchData = !search ? data:data.filter((item) =>
       item.strCategory.toLowerCase().includes(search.toLowerCase())||item.strMeal.toLowerCase().includes(search.toLowerCase())
    );


  useEffect(()=>{
    getData()
  },[])
  

  return (

    <div className='app'>
      <h1>Welcome to TheMealDB</h1>
     Search : <input type='text' placeholder='type here...' onChange={(event)=>{
        setSearch(event.target.value)
      }}></input>
      <button onClick={()=>{
        alert("cart")
      }}>My-Cart</button><button>{addCart}</button>
     

    <div className="main">
      {
      searchData.map((item,index)=>{
        return (
          <div className='item-display'>
            <img src={item.strMealThumb} alt=''></img>
            <p>Category : {item.strCategory}</p>
            <p><u>{item.strMeal}</u>       <button>10$</button>   <button onClick = {()=>{
              setAddCart(addCart+1)
              let newData=[...myCart]
              newData.push(item)
              setMyCart(newData)
              console.log(myCart)
            }}>add to cart</button> <button onClick={()=>{
              if (addCart===0){
                setAddCart(0)
              }
              else{
                setAddCart(addCart-1)
              }
            }}>remove</button></p>


            
          </div> 
        )
      })
      }

      
    </div>
    </div>
  );
}

export default App;
