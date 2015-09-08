# HackQ
HackQ (or HackerHelpMe) is a web application allowing hackers to ask for help  during hackathon events.

## Node Dependencies:
To install all "node_modules":

```
npm install
```

You may selectively uninstall node dependency. To do so:

```
npm uninstall [node_module_name]
```

Please refer to "package.json" for the list of node dependencies.

## CLI Tools:
All CLI tools are installed when typing "npm install" as instructed above.

To install all CLI tools exclusively to Node dependencies above:

```
sudo sh ./bin/setup.sh install
```

To uninstall all node command line tools:

```
sudo sh ./bin/setup.sh uninstall
```

The following CLI tools are being installed:

npm:

* mocha
* firebase-tools
* grunt-cli

gem:

* sass
* bourbon
* travis

## Running the server
You may run the Node.js server by typing:
```
npm start
```
 
However, during the development, the build step must be executed before the server starts. To do so:
```
sh ./bin/build.sh
```

You also need to manually start MongoDB server after build script above:
```
mongod --dbpath dbpath
```

Build step can also be refreshed upon changes by typing the following after the above step:
```
grunt watch
```

If you want to host your current development to the public before deployment, you may use ngrok script. After "npm start" command from above, type:

```
./bin/ngrok http 3000
```

This will generate temporary URL for public to see.

## Loading Sample Data
For the purpose of development, sample data can be loaded with following command while MongoDB server is running:
```
node ./samples/loadData.js
```

## Testing
You may run Mocha unit test by typing:
```
npm test
```

## Programming Guideline
1. Perform ```npm install``` to install all dependencies and CLI tools.
2. All CSS and front-end JS should be saved under "dev" directory.
3. Any libraries for front-end JS must be saved under "dev/libraries" in minified format.
4. Other assets such as fonts and images are saved under "public" with appropriate sub-directory name.
5. All testing codes are written in Mocha and should be saved under "test" directory.
6. All HTML files are saved under "views" directory with extension of ".html" instead of ".handlebars". Handlebars logic still work here.
7. All JS file dealing with Node.js routing should be saved under "routes" directory. Make sure to edit "server.js" appropriately.
