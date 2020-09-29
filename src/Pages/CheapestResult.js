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
      <CardBody className="page">
        <CardTitle className="">Din inköpslista</CardTitle>
        <CardText className="">blir billigast hos: </CardText>
        <div classname="first-seg">
          <CardImg
            className="responsive"
            src="https://lh3.googleusercontent.com/proxy/rLv9GbeKWzlSmi8yWR1bROlxf2P1fJWBcqrZ3TfWfWR9PRiMtiar1f7VeMcuiF6lnmZaMy0EhZYY4XCSAJYM2UusG5GiYYXIsInGV-Wv_o5MMcOJmMmvUZuUXuN_prEyJ_j-KHN5QcXmpcgfXceNQAwU1L91"
          ></CardImg>
          <CardText>med en totalsumma på</CardText>
          <CardText> 387 kr </CardText>
        </div>
        <div className="line"></div>
        <div className="second-seg">
          <CardImg
            className="responsive"
            src="https://static.hitta.se/static/products/images/InfoTextDeluxe/icaboras3_Il.png"
          ></CardImg>
          <CardText>500 kr</CardText>
        </div>
        <div className="second-seg">
          <CardImg
            className="responsive"
            src="https://images.saasm2m.com/m2mstatic/images/butik/5747.jpg"
          ></CardImg>
          <CardText> 400 kr </CardText>
        </div>
      </CardBody>
      </Card>
    </>
  );
};

export default CheapestResult;
