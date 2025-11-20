import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import bwImage from '../../Assets/Projects/bw.jpg';
import sign from "../../Assets/Projects/voice2sign.png";

import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";

import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bwImage}
              isBlog={false}
              title="BACKLOG WALLAH!"
              description="Python based Android App build with kivyMD module which is a learning application helps in clearing backlogs"
              ghLink="https://github.com/rajureddi/BACKLOG-WALLAH-"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sign}
              isBlog={false}
              title="voice 2 sign"
              description="voice2sign is a sign language to voice and voice to sign language conversion application with the help of machine learning and deep learning."
              ghLink="https://github.com/rajureddi/voice2sign"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="NAMED ENTITY RECOGNITION-BERT"
              description="Named Entity Recognition (NER) is a subtask of information extraction that locates and classifies named entities mentioned in unstructured text into pre-defined categories such as the person names, organizations, locations, medical codes, time expressions, quantities, monetary values, percentages, etc. trained with conell2003 dataset."
              ghLink="https://github.com/rajureddi/ner-bert"
                           
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/rajureddi/PlantAI"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="SENTIMENT ANALYSIS BASED AD GENERATION"
              description="NATURAL LANGUAGE PROCESSING based project analysis the feedback from the users based on their sentiment it generates ad for market growth"
              ghLink="https://github.com/rajureddi/sentiment_analysis"

            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/rajureddi/Face-Recognition-and-Emotion-Detection"
              
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
