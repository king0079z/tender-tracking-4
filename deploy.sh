#!/bin/bash

# Build the application
npm run build

# Serve using a production-grade server
npm install -g serve
serve -s dist -l 3000