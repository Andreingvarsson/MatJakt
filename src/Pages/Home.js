import React, { useContext }  from 'react';
import { StoreContext } from '../ContextProviders/StoreContext';


const Home = () => {

    // Set our own standard to this method {search}
    
    //let debounceID = null

  //The debounce is used to reduce the overall load on the frontend and used often in searchfields and large data transfers to api/rest
  //To make it simple, the debounce consists of a local variable in this case debounceID on line 7.
  //This is to prevent it from creating several copies of the variable. Check JS pointers and references on google.
  //And in the debounce helper function it checks if the debounceID isn't null/already has an instance running and stop the instance
  //Then creates a new instance. In simplicity it keeps on instance running all the time when something is searched in the field.
  //This in turn also keeps the fetch from backend in one instance instead of creating several fetches at same time.
  //NOTE: A debounce is used widely in almost every project to reduce load on frontend and increase performance in the app overall.
 
  // const debounceHelper = (search) => {
  //   if(debounceID !== null){
  //     clearTimeout(debounceID)
  //     debounceID = null
  //   }
  //   debounceID = setTimeout(() => {
  //     searchProduct(search)
  //   },250)
  // }

    const {getProducts} = useContext(StoreContext)

  return (
    <>
    <div className="home"> 
    <h1>hejsan kings</h1>
    <button onClick={()=> getProducts()}>Knapp</button>
    </div>
    </>
  );
}

export default Home;