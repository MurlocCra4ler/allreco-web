# allreco-web
This repo contains the scripts for the allreco site.

## Setting up the Environment

To install all necessary dependencies run:

    npm install && npm run prepare

## Building the the JS-Files

The project uses husky, which builds the project after commiting and adds alle build files to the commit.
To build the project manually run the following commands:

    npm run build && npm run compress
