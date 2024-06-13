# Kubernetes APIM Deployment Single Node Deployment 

This repository is designed to teach you the fundamentals of Kubernetes (K8s) resources, emphasizing the deployment of a simple NodeJs web application into a Kubernetes cluster.


## Prerequisites

Before deploying the K8s resources in this repository, ensure you have completed the following prerequisites:

1. Set up a Kubernetes cluster:
    - Download and install [Rancher Desktop](https://rancherdesktop.io/), which provides a lightweight, single-node Kubernetes cluster on your local machine with minimal effort.
    - Follow the instructions in "Step 1: Set Up Kubernetes Cluster on Rancher Desktop" from this [Medium post](https://medium.com/@chandimacba/deploying-wso2-api-manager-4-0-0-on-kubernetes-local-cluster-running-on-apple-mac-with-silicon-chip-809d5df20c46#:~:text=Step%201%3A%20Set%20Up%20Kubernetes%20Cluster%20on%20Rancher%20Desktop) to set up the Kubernetes cluster in Rancher Desktop.
2. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git),[Kubernetes client](https://kubernetes.io/docs/tasks/tools/install-kubectl/) in order to run the steps provided in the
  following quick start guide.
2. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/).
3. Clone [this github repository](https://github.com/cbabey/kubernetes-demo).

##  Setup and Apply K8s Resources

Follow these steps to deploy APIM in your Kubernetes cluster:

1. Create a namespace named `simple-app-dev`:

   ```bash
   kubectl create namespace simple-app-dev
   ```

2. Navigate to the directory `cd kubernetes-demo/kubernetes` in the cloned repository.

3. Execute the following command to apply the K8s resources:

   ```bash
   kubectl apply -f . -n simple-app-dev
   ```
## Validating the Deployment

Ensure the successful deployment of APIM in your Kubernetes cluster by following these steps:

1. **Check Pod Status:**
   Verify that the pods related to the APIM deployment are running successfully.

   ```bash
   kubectl get pods -n simple-app-dev
   ```

2. **Check Services:**
   Verify that the necessary services are running and have ClusterIP or External IP assigned.

   ```bash
   kubectl get services -n simple-app-dev
   ```

3. **Verify Ingress Resources:**
   Ensure that the Ingress resources are correctly configured.

   ```bash
   kubectl get ing -n simple-app-dev
   ```


## Accessing the APIM Server

After successful deployment, access the APIM server using the following steps:

1. Obtain the external IP address of the Ingress resources:

   ```bash
   kubectl get ing -n simple-app-dev
   ```

   Example output:

   ```plaintext
   NAME                     CLASS    HOSTS            ADDRESS        PORTS   AGE
   simple-web-app-ingress   <none>   sample.app.com   192.168.5.15   80      3m44s
   ```

2. Add DNS mappings to your `/etc/hosts` file:

   ```plaintext
   192.168.5.15  simple.app.com
   ```

   Replace `192.168.5.15` with your external IP obtained in the previous step.

3. Access the application via the http://simple.app.com/home


## Docker Image Information
The Docker image used in this deployment has already been uploaded to Docker Hub. You can seamlessly use this Docker image to test out the K8s resources without requiring a rebuild of the Docker image. If you want to make modifications to the application code, you can go to the source code of the application, which resides in the ../application directory, and rebuild the image.

Docker Image: chandimacba/simple-web-app:latest

By following these steps and utilizing the provided resources, you can efficiently deploy and manage a simple NodeJs web application within a Kubernetes cluster.