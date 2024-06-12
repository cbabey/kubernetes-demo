# Sample Web Application
Welcome to the Sample Web Application! This lightweight web application, crafted with Node.js, Express.js, and the EJS templating engine, serves as an illustrative tool for exploring the functionalities of Kubernetes deployment and management.

## Features
- Health Check Configuration: Allows manual configuration of the health check status.
- Dynamic Configuration: Loads application settings from environment variables and a properties file (config.properties).
- Containerization: Dockerized application for easy deployment and demonstration.
- Logging: Integrated logging with Winston for monitoring application behavior.
- Security: Utilizes Helmet middleware to set security-related HTTP headers.
- Kubernetes Details: Displays information about the Kubernetes environment, such as pod name, namespace, and node name.
- Error Handling: Centralized error handling middleware for catching and logging errors.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Node.js (if you want to run the application locally)


## Getting Started

To get started with the application, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/cbabey/kubernetes-demo.git
```
2. Navigate to the project directory:

```sh
cd kubernetes-demo/application
```
3. [optional] Configure the config.properties file:

Create a config.properties file with the following content:

```sh
description=This is a simple web application deployed in Kubernetes.
```
Update the description as needed. This file need to be mounted into the container

4. Build the Docker image:

```sh
docker build -t kubernetes-demo-app .
```
## Running the Application

Once you've built the Docker image, you can run the application using the following command:

```sh
docker run -p 3000:3000 \
-e PORT=3000 \
-e PAGE_NAME="Your Page Name" \
-e CONTAINER_ID="Your Container ID" \
-e HOSTNAME="Your Hostname" \
-e NAMESPACE="Your Namespace" \
-e NODE_NAME="Your Node Name" \
kubernetes-demo-app
```
Replace "Your Page Name", "Your Container ID", "Your Hostname", "Your Namespace", and "Your Node Name" with appropriate values.

The application will be accessible at http://localhost:3000.

### Health Check Endpoint
To check the health status of the application, you can use the following URL endpoint:
```sh
curl -X GET -H "Content-Type: application/json" http://localhost:3000/health

```
### Setting Health Status
You can set the health check status of the application using the following API:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"status": "down"}' http://localhost:3000/set-health

```
## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.