import React from "react";
import "../Css/CheapestResult.css";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CheapestResult = (props) => {

// Change to reactstrap Card + resposivity.

  return (
    <>
    <Card>
      <div className="page">
        <h1 className="">Din inköpslista</h1>
        <h3 className="">blir billigast hos: </h3>
        <div classname="first-seg">
          <img
            className="responsive"
            src="https://lh3.googleusercontent.com/proxy/rLv9GbeKWzlSmi8yWR1bROlxf2P1fJWBcqrZ3TfWfWR9PRiMtiar1f7VeMcuiF6lnmZaMy0EhZYY4XCSAJYM2UusG5GiYYXIsInGV-Wv_o5MMcOJmMmvUZuUXuN_prEyJ_j-KHN5QcXmpcgfXceNQAwU1L91"
          ></img>
          <h3>med en totalsumma på</h3>
          <h3> 387 kr </h3>
        </div>
        <div className="line"></div>
        <div className="second-seg">
          <img
            className="responsive"
            src="https://static.hitta.se/static/products/images/InfoTextDeluxe/icaboras3_Il.png"
          ></img>
          <h5> 500 kr </h5>
        </div>
        <div className="second-seg">
          <img
            className="responsive"
            src="https://images.saasm2m.com/m2mstatic/images/butik/5747.jpg"
          ></img>
          <h5> 400 kr </h5>
        </div>
      </div>
      </Card>
    </>
  );
};

export default CheapestResult;
