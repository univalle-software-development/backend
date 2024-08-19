#!/bin/bash

# Build the Podman image
podman build -t filmore_image_backend .

# Create a container from the image
container_id=$(podman create filmore_image_backend)

# Start the container (required for podman exec)
podman start $container_id

echo "Current directory on host: $(pwd)"
# Stop the container after creating the archive
podman stop $container_id

# Copy the tarball from the container to the host
podman cp $container_id:/. .

# Clean up by removing the container
podman rm $container_id