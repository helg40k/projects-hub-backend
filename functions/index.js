import functions from 'firebase-functions';
import express from './api/v1/express/index.js';

export const projects = functions.https.onRequest(express.projects);
