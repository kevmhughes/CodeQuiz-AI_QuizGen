# BrainCode Quiz App (WIP)

Welcome to **BrainCode** — an engaging and interactive quiz app that challenges your knowledge on a wide range of programming and web development topics. **BrainCode** lets you select a topic-based quiz powered by AI-generated questions, or you can take a random quiz drawn from a variety of questions stored in a **MongoDB** database. 

The topics are designed to help you test your knowledge in various technologies and frameworks, making learning fun and competitive. Whether you are a beginner or an advanced developer, there's a quiz for everyone!

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Integration](#api-integration)
- [How to Use](#how-to-use)
- [Quiz Topics](#quiz-topics)

---

## Introduction

**BrainCode** is built with **React** and **Vite** for a fast and modern web experience. The app pulls quiz data from the  [**CodeQuest API**](https://codequestapi.onrender.com)  and offers a variety of ways to engage with the content:

- Choose a **topic-based AI-generated quiz** from a predefined list of topics powered by Google Gemini.
- Take a **random quiz** pulled from a MongoDB database for even more variety.
- See your final score.

---

## Features

- **AI-Generated Quizzes**: Automatically generates quizzes on various topics using the **CodeQuest API**.
- **MongoDB Quizzes**: Access random quizzes stored in MongoDB for a more diverse experience.
- **Responsive Design**: The app is fully responsive, so you can enjoy it on desktop and mobile devices.
- **Real-time Scoring**: View your score after each quiz.

---

## Tech Stack

- **Frontend**: 
  - **React** – A JavaScript library for building user interfaces.
  - **Vite** – A fast build tool that enables a speedy development process.
  - **CSS** – For styling the application.

- **Backend (API)**:
  - **CodeQuest API** – A custom-built API that generates AI-powered quizzes on different programming topics. (Node.js, Express, etc.)
  - **MongoDB** – Used for storing random quizzes and user results.

- **Other Libraries**:
  - **Axios** – For making API requests to fetch quizzes.
  - **JWT (JSON Web Tokens)** – For managing user authentication.
  - **Chart.js** – For visualizing quiz performance and results.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [MongoDB](https://www.mongodb.com/) (for storing random quizzes)

### Clone the Repository

`git clone https://github.com/yourusername/CodeBrain-AI_QuizGen.git`

`cd CodeBrain-AI_QuizGen`

`npm install`

`npm run dev`

## API Integration

The **BrainCode** app pulls quiz data from the **CodeQuest API**. You can interact with the API through this key endpoint:

- **`api/v1/questions/ai`** – Get a list of available quiz topics (see the topics section below).

The API handles all the logic for generating the quiz questions and calculating the answers.

---

## Quiz Topics

When you launch the app, you'll have the option to choose from the following quiz topics:

- **Angular**
- **Cloud Computing**
- **CSS**
- **Data Security**
- **DOM**
- **Express**
- **HTML**
- **JavaScript - Advanced**
- **JavaScript - Basics**
- **MongoDB**
- **Node**
- **Python**
- **React**
- **Testing**
- **SQL**
- **TypeScript**
- **Vue**

Simply select the topic you want to be quizzed on, and the app will fetch ten relevant questions from the **CodeQuest API** or serve up a random quiz from the MongoDB database if you're feeling spontaneous!

---

## How to Use

1. **Choose Your Quiz Type**: On the home screen, you can select between:

AI: **Topic-Based Quiz**: Pick a specific topic from the list of available quizzes, such as React, JavaScript, or Cloud Computing.
CB: **Random Quiz**: Get a random quiz question from a variety of topics stored in MongoDB.

2. **Answer the Questions**: Each quiz displays a series of multiple-choice questions. Select your answers to proceed through the quiz.

3. **View Results**: After completing the quiz, you'll receive your score.

---

Thank you for using **BrainCode** — happy quizzing! 🎉
