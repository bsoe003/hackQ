shopt -s nullglob

# CSS Compilation
cd dev
SCSS=(*.scss)
for i in ${SCSS[*]}; do
	sass $i $i.css
done
unset SCSS
cat *.scss.css > style.css
rm *.scss.css
rm *.map
rm -rf .sass-cache
uglifycss style.css > style.min.css
rm style.css
mv style.min.css ../public
cd ..

# Client JS Compilation
cd dev
JSX=(*.jsx)
for i in ${JSX[*]}; do
	babel $i > $i.js
done
unset JSX
cat *.js > script.js
uglifyjs script.js > script.min.js
rm *.jsx.js
rm script.js
mv script.min.js ../public
cd libraries
cat *.min.js > libraries.js
uglifyjs libraries.js > libraries.min.js
rm libraries.js
mv libraries.min.js ../../public
cd ../..

if [ ! -d "dbpath" ]; then
	mkdir dbpath
fi
