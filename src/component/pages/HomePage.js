import React from 'react'
import { NavbarBrand} from 'reactstrap';

export default function HomePage() {
    return (
      <div>
      <div >
        <br/>
        <h3>Välkommen till</h3>
        <h1>MatJakt!</h1>
      </div>
      <div className='bak1'>
        <br/>
    </div>
    {/* <button onClick={()=> getProducts()}>Hämta produkter</button> */}
 <div className="HH2">  <NavbarBrand href="/AllP" className="mr-auto">Hämta produkter</NavbarBrand>
</div>
</div>        
    )
}
