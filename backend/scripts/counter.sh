#!/bin/bash

# Counter variable
count=1

# Function to send the request
send_request() {
    response_code=$(curl -X POST http://localhost:3000/publish-counter \
        -H "Content-Type: application/json" \
        -d "{\"counter\": $count}" \
        -w "%{http_code}" \
        -s \
        -o /dev/null)
    
    echo "Published counter: $count (Response: $response_code)"
    ((count++))
}

# Trap Ctrl+C to exit gracefully
trap 'echo "Stopping counter..."; exit 0' INT

echo "Starting counter script. Press Ctrl+C to stop."
echo "Sending requests to http://localhost:3000/publish-counter"

# Main loop
while true; do
    send_request
    sleep 0.1
done 