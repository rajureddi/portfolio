import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
<<<<<<< HEAD
function ProjectCard(props) {
  return (
    <Card className="project-card-view h-100">
      <Card.Img
        variant="top"
        src={props.imgPath}
        alt="card-img"
        className="project-card-img"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{props.title}</Card.Title>
        {props.tags && (
    <div className="project-tags">
      {props.tags.map((tag, index) => (
        <span key={index} className="project-tag">
          {tag}
        </span>
      ))}
    </div>
  )}

        <Card.Text className="project-card-desc">
          {props.description}
        </Card.Text>

        <div className="mt-auto">
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp; GitHub
          </Button>

          {!props.isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
              style={{ marginLeft: "10px" }}
            >
              <CgWebsite /> &nbsp; Demo
            </Button>
          )}
        </div>
=======

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank">
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
      </Card.Body>
    </Card>
  );
}
<<<<<<< HEAD

export default ProjectCard;
=======
export default ProjectCards;
>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
