#!/bin/bash

# Copy EAS configuration from resources to app directory
if [ -f "resources/eas.json" ]; then
  cp resources/eas.json app/eas.json
  echo "Copied eas.json to app/"
elif [ -f "eas.json" ]; then
  cp eas.json app/eas.json
  echo "Copied eas.json to app/"
else
  echo "Warning: eas.json not found in resources/ or root directory"
  exit 1
fi
