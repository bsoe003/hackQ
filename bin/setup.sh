function installed {
  local return_=1
  type $1 >/dev/null 2>&1 || { local return_=0; }
  echo "$return_"
}

NPM=(mocha firebase-tools grunt-cli)
GEM=(sass bourbon travis)

if [ -z "$1" ]; then
    echo "No argument supplied"
    exit 0
fi

if [ $1 == "install" ]; then
    for i in ${NPM[*]}; do
        if [ $(installed $i) != 1 ]; then
            echo "Installing $i"
            npm install $i -g
        fi
    done
    for i in ${GEM[*]}; do
        if [ $(installed $i) != 1 ]; then
            echo "Installing $i"
            gem install $i
        fi
    done
    if [ $(installed bourbon) == 1 ]; then
        cd dev
        bourbon install
        cd ..
    fi
fi

if [ $1 == "uninstall" ]; then
    for i in ${NPM[*]}; do
        if [ $(installed $i) == 1 ]; then
            echo "Removing $i"
            npm uninstall $i -g
        fi
    done
    for i in ${GEM[*]}; do
        if [ $(installed $i) == 1 ]; then
            echo "Removing $i"
            gem uninstall $i
        fi
    done
fi

unset NPM
unset GEM
