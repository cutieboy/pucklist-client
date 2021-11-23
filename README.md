# Base Authentication System

This is my base auth system used for my projects, it can be used with any backend but is written for firebase.

## Usage

### 1. npm install

Run npm install or yarn add to add all dependencies

### 2. create .env.local in base directory

A .env.local must be created in the root directory to add API credentials to. API values are mapped in:

#### firebase.js

The ENV Local structure must look like this (for Firebase):\
REACT_APP_FIREBASE_API_KEY={api-key-goes-here}\
REACT_APP_FIREBASE_AUTH_DOMAIN={auth-domain-goes-here}\
REACT_APP_FIREBASE_PROJECT_ID={project-id-goes-here}\
REACT_APP_FIREBASE_STORAGE_BUCKET={storage-bucket-goes-here}\
REACT_APP_FIREBASE_MESSAGING_SENDER_ID={messaging-sender-id-goes-here}\
REACT_APP_FIREBASE_APP_ID={app-id-goes-here}

### 3. npm start or yarn start

Run npm start or yarn start to start the react application on http://localhost:3000/

## Usage with Firebase

To use with firebase, create a new firebase app or take an existing app and navigate to Project Settings -> Your apps -> SDK setup and configuration
