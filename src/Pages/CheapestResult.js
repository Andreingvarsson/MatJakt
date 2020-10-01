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
    
    <Card className="container card-border top-margin background">
      <CardBody className="page">
        <CardTitle className="title">Din inköpslista</CardTitle>
        <CardText className="text">blir billigast hos: </CardText>
        <div classname="first-seg">
          <CardImg
            className="col-8"
            src="https://static.hitta.se/static/products/images/InfoTextDeluxe/icaboras3_Il.png"
          ></CardImg>
          <CardText className="text">med en totalsumma på</CardText>
          <CardText className="text bold"> 387 kr </CardText>
        </div>
        <div className="line"></div>
        <div className="second-seg col-6">
          <CardImg
            className="responsive"
            src="https://static.hitta.se/static/products/images/InfoTextDeluxe/icaboras3_Il.png"
          ></CardImg>
          <CardText className="col-10 middle sec-seg-text">500 kr</CardText>
        </div>
        <div className="second-seg col-6">
          <CardImg
            className="responsive"
            src="https://static.hitta.se/static/products/images/InfoTextDeluxe/icaboras3_Il.png"
          ></CardImg>
          <CardText className="col-10 middle sec-seg-text"> 400 kr </CardText>
        </div>
      </CardBody>
      </Card>
   
    </>
  );
};

export default CheapestResult;
