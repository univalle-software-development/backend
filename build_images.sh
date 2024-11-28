#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 6 ]; then
    echo "Usage: $0 <image1_name> <image1_tag> <image1_context_path> <image2_name> <image2_tag> <image2_context_path>"
    exit 1
fi

# Assign arguments to variables
IMAGE1_NAME=$1
IMAGE1_TAG=$2
IMAGE1_CONTEXT_PATH=$3
IMAGE2_NAME=$4
IMAGE2_TAG=$5
IMAGE2_CONTEXT_PATH=$6

# Step 1: Build the first Docker image
echo "Building Docker image: $IMAGE1_NAME:$IMAGE1_TAG with context $IMAGE1_CONTEXT_PATH"
docker build -t "$IMAGE1_NAME:$IMAGE1_TAG" "$IMAGE1_CONTEXT_PATH"

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Failed to build image: $IMAGE1_NAME:$IMAGE1_TAG"
    exit 1
fi

# Step 2: Build the second Docker image
echo "Building Docker image: $IMAGE2_NAME:$IMAGE2_TAG with context $IMAGE2_CONTEXT_PATH"
docker build -t "$IMAGE2_NAME:$IMAGE2_TAG" "$IMAGE2_CONTEXT_PATH"

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Failed to build image: $IMAGE2_NAME:$IMAGE2_TAG"
    exit 1
fi

echo "Both Docker images built successfully."
