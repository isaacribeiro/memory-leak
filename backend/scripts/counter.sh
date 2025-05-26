#!/bin/bash

# Counter variable
count=1

# Function to send the request
send_request() {
    curl -X POST http://localhost:3000/publish-counter \
        -H "Content-Type: application/json" \
        -d "{\"counter\": $count}" \
        -s > /dev/null
    
    echo "Published counter: $count"
    ((count++))
}

# Trap Ctrl+C to exit gracefully
trap 'echo "Stopping counter..."; exit 0' INT

echo "Starting counter script. Press Ctrl+C to stop."
echo "Sending requests to http://localhost:3000/publish-counter"

# Main loop
while true; do
    send_request
    sleep 1
done 