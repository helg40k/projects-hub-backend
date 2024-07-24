import functions from 'firebase-functions';
import express from './api/v1/express/index.js';

export const projects = functions
  .runWith({ memory: '256MB', timeoutSeconds: 540 })
  .https.onRequest(express.projects);
