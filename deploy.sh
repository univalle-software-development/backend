#!/bin/bash

# Variables
IMAGE_NAME="my-app"
IMAGE_TAG="latest"
REGISTRY="<your-registry>/$IMAGE_NAME:$IMAGE_TAG"
DEPLOYMENT_FILE="deployment.yaml"

# Step 1: Build the Docker image
echo "Building Docker image..."
docker build -t $REGISTRY .

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Docker build failed."
  exit 1
fi

# Step 2: Push the Docker image to the registry
echo "Pushing Docker image to registry..."
docker push $REGISTRY

# Check if the push was successful
if [ $? -ne 0 ]; then
  echo "Docker push failed."
  exit 1
fi

# Step 3: Deploy to Kubernetes
echo "Deploying to Kubernetes..."
kubectl apply -f $DEPLOYMENT_FILE

# Check if the deployment was successful
if [ $? -ne 0 ]; then
  echo "Kubernetes deployment failed."
  exit 1
fi

echo "Deployment completed successfully."
