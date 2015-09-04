if [ -z "$1" ]; then
    echo "No argument supplied"
    exit 0
fi

if [ $1 == "development" ]; then
    npm install
    sh ./bin/build.sh
    grunt watch &
    # mongod --dbpath dbpath &
    npm start
fi

if [ $1 == "production" ]; then
    npm install --production
    npm start
fi

trap ctrl_c INT

function ctrl_c() {
    echo "** Trapped CTRL-C"
}