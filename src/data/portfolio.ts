export type Project = {
  id: string
  title: string
  category: 'On-device AI' | 'Computer vision' | 'Applications'
  year: string
  summary: string
  description: string
  tags: string[]
  repo: string
  artwork?: 'aura' | 'vision' | 'pay' | 'traffic'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'aura',
    title: 'AuraOnDevice AI HUB',
    category: 'On-device AI',
    year: '',
    summary: 'Multimodal AI, right on your phone.',
    description:
      'An Android app for offline chat, vision, and retrieval-augmented generation. MNN and MediaPipe power inference directly on the device without a cloud dependency.',
    tags: ['Android', 'MNN', 'MediaPipe', 'RAG'],
    repo: 'https://github.com/rajureddi/AuraOnDevice-AI_HUB',
    artwork: 'aura',
    featured: true,
  },
  {
    id: 'visionaid',
    title: 'VisionAid++',
    category: 'On-device AI',
    year: '',
    summary: 'Assistive AI for everyday navigation.',
    description:
      'An on-device multimodal AI system for blind navigation and low-vision enhancement. It uses C++ inference to provide offline, privacy-preserving assistance.',
    tags: ['Accessibility', 'Multimodal AI', 'C++', 'Android'],
    repo: 'https://github.com/rajureddi/On-Device-MultiModel-Ai-for-blind-navigation-and-low-vision-enhancement',
    artwork: 'vision',
    featured: true,
  },
  {
    id: 'turantpay',
    title: 'TurantPay',
    category: 'Applications',
    year: '',
    summary: 'UPI payments beyond the internet.',
    description:
      'An Android payment app that enables offline UPI transactions through the USSD *99# service.',
    tags: ['Android', 'FinTech', 'UPI', 'USSD'],
    repo: 'https://github.com/rajureddi/TurantPay',
    artwork: 'pay',
    featured: true,
  },
  {
    id: 'traffic',
    title: 'Smart Traffic Management',
    category: 'Computer vision',
    year: '',
    summary: 'Traffic signals that respond to demand.',
    description:
      'An AI-based traffic management system using YOLO for real-time vehicle-density analysis. Dynamic signal control responds to changing traffic conditions.',
    tags: ['YOLO', 'Computer vision', 'Deep learning'],
    repo: 'https://github.com/rajureddi/Smart-AI-Based-Traffic-Management-System',
    artwork: 'traffic',
    featured: true,
  },
  {
    id: 'voice2sign',
    title: 'Voice2Sign',
    category: 'Computer vision',
    year: '',
    summary: 'From spoken words to sign language.',
    description:
      'An accessibility tool that converts spoken language into sign-language animations using deep learning.',
    tags: ['Accessibility', 'Deep learning', 'Computer vision'],
    repo: 'https://github.com/rajureddi/voice2sign',
  },
  {
    id: 'backlog-wallah',
    title: 'Backlog Wallah',
    category: 'Applications',
    year: '',
    summary: 'An Android learning companion for students.',
    description:
      'A Python-based Android learning application built with KivyMD to help students work through academic backlogs.',
    tags: ['Python', 'KivyMD', 'Android', 'Education'],
    repo: 'https://github.com/rajureddi/BACKLOG-WALLAH-',
  },
  {
    id: 'ner-bert',
    title: 'Named Entity Recognition',
    category: 'Applications',
    year: '',
    summary: 'Finding structured meaning in unstructured text.',
    description:
      'A BERT-based named entity recognition system trained on the CoNLL-2003 dataset to extract entities from unstructured text.',
    tags: ['BERT', 'NLP', 'Deep learning'],
    repo: 'https://github.com/rajureddi/NER-BERT',
  },
  {
    id: 'plant-ai',
    title: 'Plant AI',
    category: 'Computer vision',
    year: '',
    summary: 'Recognizing plant disease with deep learning.',
    description:
      'A plant-disease detection project using convolutional neural networks and ResNet34.',
    tags: ['CNN', 'ResNet34', 'Computer vision'],
    repo: 'https://github.com/rajureddi/PlantAI',
  },
  {
    id: 'localmind',
    title: 'LocalMind',
    category: 'On-device AI',
    year: '',
    summary: 'Private language models on mobile hardware.',
    description:
      'An Android inference engine that runs large language models fully on mobile hardware, supporting private, offline use.',
    tags: ['Android', 'LLMs', 'Offline inference'],
    repo: 'https://github.com/rajureddi/LocalMind',
  },
  {
    id: 'depthsight',
    title: 'DepthSightAI',
    category: 'On-device AI',
    year: '',
    summary: 'Object detection with a sense of depth.',
    description:
      'An Android application combining real-time object detection with ARCore depth estimation. It provides on-device spatial awareness for edge scenarios.',
    tags: ['Android', 'ARCore', 'Object detection', 'Depth estimation'],
    repo: 'https://github.com/rajureddi/depthsightai',
  },
  {
    id: 'payment-fraud',
    title: 'E-Payment Fraud Detection',
    category: 'Applications',
    year: '',
    summary: 'Spotting suspicious payment patterns.',
    description:
      'An AI-powered system that analyzes transaction patterns in real time to flag suspicious activity in digital payments.',
    tags: ['AI', 'FinTech', 'Fraud detection'],
    repo: 'https://github.com/rajureddi/epapyment',
  },
  {
    id: 'emergency-detection',
    title: 'Emergency Vehicle Detection',
    category: 'Computer vision',
    year: '',
    summary: 'Recognizing emergency vehicles in real time.',
    description:
      'A fine-tuned YOLO model for detecting ambulances, fire engines, and police cars. The project supports emergency-vehicle priority in smart traffic systems.',
    tags: ['YOLO', 'Object detection', 'Smart traffic'],
    repo: 'https://github.com/rajureddi/ambulance-detection-Emergency-vechiles-deetection',
  },
  {
    id: 'votersetu',
    title: 'VoterSetu',
    category: 'Applications',
    year: '',
    summary: 'Connecting voters with electoral services.',
    description:
      'A civic-tech platform for voter registration, electoral information lookup, and electoral awareness.',
    tags: ['Civic tech', 'Android', 'Freelancing'],
    repo: 'https://github.com/rajureddi/votersetu',
  },
  {
    id: 'face-attendance',
    title: 'Face Recognition Attendance',
    category: 'Computer vision',
    year: '',
    summary: 'Automating attendance with face recognition.',
    description:
      'A Python-based attendance system that detects and identifies faces in real time to record attendance automatically.',
    tags: ['Python', 'Face recognition', 'Computer vision'],
    repo: 'https://github.com/rajureddi/FACE_RECOGNITION_BASED_ATTENDANCE',
  },
]

export const profile = {
  name: 'Raju Bandam',
  role: 'AI Engineer · Full-stack Developer',
  email: 'rajubandam694@gmail.com',
  github: 'https://github.com/rajureddi',
  linkedin: 'https://www.linkedin.com/in/rajureddie/',
  twitter: 'https://twitter.com/naughtyeth',
  instagram: 'https://www.instagram.com/rajureddie__',
  resume: '/RAJU_BANDAM_RESUME__.pdf',
}

export const education = [
  {
    qualification: 'B.Tech in Computer Science & Engineering (AIML)',
    institution: 'Malla Reddy University, Hyderabad',
    period: '2022–2026',
    result: 'CGPA 8.7',
  },
  {
    qualification: 'Intermediate · MPC',
    institution: 'SR Junior College',
    period: '2020–2022',
    result: '90.1%',
  },
  {
    qualification: 'SSC',
    institution: 'ZPSS T/EM Chennur',
    period: '2020',
    result: 'CGPA 10',
  },
]

export const skillGroups = [
  {
    title: 'Intelligent systems',
    items: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'YOLO', 'BERT', 'Computer vision', 'NLP'],
  },
  {
    title: 'Product engineering',
    items: ['Java', 'JavaScript', 'React', 'Next.js', 'Flask', 'Node.js', 'Kotlin', 'Android'],
  },
  {
    title: 'Tools & deployment',
    items: ['Git', 'AWS', 'MNN', 'MediaPipe'],
  },
]
