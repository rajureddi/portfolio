import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">RAJU BANDAM </span>
            from <span className="purple"> Hyderabad, India.</span>
            <br />
            I am currently B.Tech CSE-AIML Final year student at <span className="purple">MALLA REDDY UNIVERISTY</span>.
            <br />
          
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Watching Movies and Series
            </li>
            <li className="about-activity">
              <ImPointRight /> Web3 Dapps Testing
            </li>
            <li className="about-activity">
              <ImPointRight /> Crypto Trading
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Creating, Testing, and Trading to Shape the Future of Technology!"{" "}
          </p>
          <footer className="blockquote-footer">RAJU</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
