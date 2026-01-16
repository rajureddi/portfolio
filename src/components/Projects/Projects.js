import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import leaf from "../../Assets/Projects/leaf.png";
import backlogWallah from "../../Assets/Projects/backlog-wallah.jpg";
import sign from "../../Assets/Projects/voice2sign.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import suicide from "../../Assets/Projects/suicide.png";

import traffic from "../../Assets/Projects/smart-traffic.png";
import turantpay from "../../Assets/Projects/turantpay.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          {/* TURANTPAY */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={turantpay}
              isBlog={false}
              title="TurantPay – Offline UPI App"
              description="TurantPay is an offline UPI payment solution enabling secure transactions without internet access using USSD (*99#), focusing on financial inclusion in low-network and rural areas."
              ghLink="https://github.com/rajureddi/TurantPay"
              tags={["FinTech", "UPI", "USSD", "Android"]}
            />
          </Col>
           {/* VOICE2SIGN */}
          <Col md={4} className="project-card ">
            <ProjectCard
              imgPath={sign}
              isBlog={false}
              title="Voice2Sign"
              description="Voice2Sign is an AI-powered accessibility application that converts spoken language into sign language animations and translates sign language gestures back into voice. The system leverages deep learning models for speech recognition, hand gesture detection, and real-time inference to bridge communication gaps."
              ghLink="https://github.com/rajureddi/voice2sign"
                tags={["AI", "Deep Learning", "Computer Vision", "Accessibility"]}

            />
          </Col>
          
          {/* SMART TRAFFIC */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={traffic}
              isBlog={false}
              title="Smart Traffic Management System"
              description="An AI-based traffic management system that uses computer vision to analyze real-time traffic density and dynamically control traffic signals, reducing congestion and improving emergency vehicle prioritization."
              ghLink="https://github.com/rajureddi/Smart-AI-Based-Traffic-Management-System"
                tags={["AI", "Computer Vision", "Smart Cities"]}

            />
          </Col>
          {/* BACKLOG WALLAH */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={backlogWallah}
              isBlog={false}
              title="BACKLOG WALLAH!"
              description="A Python-based Android learning application built using KivyMD that helps students clear academic backlogs through structured content, quizzes, and guided learning paths."
              ghLink="https://github.com/rajureddi/BACKLOG-WALLAH-"
              tags={["Education", "Android", "KivyMD"]}
            />
          </Col>

         

          {/* NER */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Named Entity Recognition (BERT)"
              description="A BERT-based Named Entity Recognition system trained on the CoNLL-2003 dataset to extract structured information such as person names, organizations, locations, dates, and numerical entities from unstructured text."
              ghLink="https://github.com/rajureddi/ner-bert"
              tags={["NLP", "BERT", "Named Entity Recognition"]}
            />
          </Col>


          {/* PLANT AI */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="A deep learning-based plant disease detection system trained on Kaggle datasets using CNNs and transfer learning (ResNet34). Achieved up to 98% accuracy across 38 plant disease classes."
              ghLink="https://github.com/rajureddi/PlantAI"
              tags={["Deep Learning", "Computer Vision", "Agriculture"]}
            />
          </Col>


          {/* SENTIMENT */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Sentiment Analysis Based Ad Generation"
              description="An NLP-based system that analyzes user sentiment from feedback and automatically generates targeted advertisements to improve product reach and market growth."
              ghLink="https://github.com/rajureddi/sentiment_analysis"
              tags={["NLP", "Sentiment Analysis", "Advertising"]}
           />
          </Col>

          {/* FACE + EMOTION */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition & Emotion Detection"
              description="A CNN-based emotion recognition system trained on the FER-2013 dataset, combined with OpenCV for face detection to predict human emotions from images and live video feeds."
              ghLink="https://github.com/rajureddi/Face-Recognition-and-Emotion-Detection"
              tags={["Computer Vision", "Deep Learning", "Emotion Detection"]}
           />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
