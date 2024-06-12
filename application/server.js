const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const winston = require('winston');
const PropertiesReader = require('properties-reader');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PAGE_NAME = process.env.PAGE_NAME || 'Default Page Name';
const CONTAINER_ID = process.env.CONTAINER_ID || 'Not Picked';
const propertiesPath = path.join(__dirname, 'config.properties');
const properties = PropertiesReader(propertiesPath);

// Set up logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Function to check if properties file exists
const isPropertiesFileAvailable = () => {
  try {
    logger.info('Checking the availability of the file:', propertiesPath);
    fs.accessSync(propertiesPath, fs.constants.F_OK);
    logger.info('File is available');
    return true;
  } catch (err) {
    logger.error('Error checking file availability:', err);
    return false;
  }
};

// Set security-related HTTP headers
app.use(helmet());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let healthCheckStatus = true;

// Health check route
app.get('/health', (req, res) => {
  try {
    if (healthCheckStatus) {
      res.status(200).json({ status: 'UP' });
    } else {
      throw new Error('Health check failed intentionally');
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: 'DOWN', message: error.message });
  }
});

// Route to set health check status
app.post('/set-health', (req, res) => {
  const { status } = req.body;
  if (status === 'up') {
    healthCheckStatus = true;
    res.status(200).json({ message: 'Health check status set to UP' });
  } else if (status === 'down') {
    healthCheckStatus = false;
    res.status(200).json({ message: 'Health check status set to DOWN' });
  } else {
    res.status(400).json({ message: 'Invalid status' });
  }
});

const description = isPropertiesFileAvailable() ? properties.get('description') : 'This is a simple web page deployed in Kubernetes.';

// Main route to load the web page
app.get(['/home', '/'], (req, res) => {
  const kubernetesDetails = {
    podName: process.env.HOSTNAME,
    namespace: process.env.NAMESPACE,
    nodeName: process.env.NODE_NAME
  };

  res.render('index', {
    description: description,
    pageName: PAGE_NAME,
    kubernetesDetails: kubernetesDetails
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
