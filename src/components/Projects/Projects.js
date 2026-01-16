import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
<<<<<<< HEAD

import leaf from "../../Assets/Projects/leaf.png";
import backlogWallah from "../../Assets/Projects/backlog-wallah.jpg";
import sign from "../../Assets/Projects/voice2sign.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import suicide from "../../Assets/Projects/suicide.png";

import traffic from "../../Assets/Projects/smart-traffic.png";
import turantpay from "../../Assets/Projects/turantpay.png";
=======
import leaf from "../../Assets/Projects/leaf.png";
import bwImage from '../../Assets/Projects/bw.jpg';
import sign from "../../Assets/Projects/voice2sign.png";

import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";

import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
<<<<<<< HEAD
          My Recent <strong className="purple">Works</strong>
=======
          My Recent <strong className="purple">Works </strong>
>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
<<<<<<< HEAD

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
=======
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

>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
<<<<<<< HEAD
              title="Named Entity Recognition (BERT)"
              description="A BERT-based Named Entity Recognition system trained on the CoNLL-2003 dataset to extract structured information such as person names, organizations, locations, dates, and numerical entities from unstructured text."
              ghLink="https://github.com/rajureddi/ner-bert"
              tags={["NLP", "BERT", "Named Entity Recognition"]}
            />
          </Col>


          {/* PLANT AI */}
=======
              title="NAMED ENTITY RECOGNITION-BERT"
              description="Named Entity Recognition (NER) is a subtask of information extraction that locates and classifies named entities mentioned in unstructured text into pre-defined categories such as the person names, organizations, locations, medical codes, time expressions, quantities, monetary values, percentages, etc. trained with conell2003 dataset."
              ghLink="https://github.com/rajureddi/ner-bert"
                           
            />
          </Col>

>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
<<<<<<< HEAD
              description="A deep learning-based plant disease detection system trained on Kaggle datasets using CNNs and transfer learning (ResNet34). Achieved up to 98% accuracy across 38 plant disease classes."
              ghLink="https://github.com/rajureddi/PlantAI"
              tags={["Deep Learning", "Computer Vision", "Agriculture"]}
            />
          </Col>


          {/* SENTIMENT */}
=======
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/rajureddi/PlantAI"
              
            />
          </Col>

>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
<<<<<<< HEAD
              title="Sentiment Analysis Based Ad Generation"
              description="An NLP-based system that analyzes user sentiment from feedback and automatically generates targeted advertisements to improve product reach and market growth."
              ghLink="https://github.com/rajureddi/sentiment_analysis"
              tags={["NLP", "Sentiment Analysis", "Advertising"]}
           />
          </Col>

          {/* FACE + EMOTION */}
=======
              title="SENTIMENT ANALYSIS BASED AD GENERATION"
              description="NATURAL LANGUAGE PROCESSING based project analysis the feedback from the users based on their sentiment it generates ad for market growth"
              ghLink="https://github.com/rajureddi/sentiment_analysis"

            />
          </Col>

>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
<<<<<<< HEAD
              title="Face Recognition & Emotion Detection"
              description="A CNN-based emotion recognition system trained on the FER-2013 dataset, combined with OpenCV for face detection to predict human emotions from images and live video feeds."
              ghLink="https://github.com/rajureddi/Face-Recognition-and-Emotion-Detection"
              tags={["Computer Vision", "Deep Learning", "Emotion Detection"]}
           />
          </Col>

=======
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/rajureddi/Face-Recognition-and-Emotion-Detection"
              
            />
          </Col>
>>>>>>> d1f6ee981cb0b8c4fe648fa87b1c1b4a63f6b5d0
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
