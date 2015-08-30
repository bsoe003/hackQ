if [ -z "$1" ]; then
    echo "No argument supplied"
    exit 0
fi

if [ $1 == "development" ]; then
	npm install
	sh ./bin/build.sh
	grunt watch &
	npm start
fi

if [ $1 == "production" ]; then
	npm install --production
	npm start
fi