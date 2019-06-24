NEWVERSION=${1:-patch}

echo "Hi ${NEWVERSION}"

npm version $NEWVERSION --no-git-tag-version
mkdir publish

babel --presets @babel/preset-env ./ -D -d publish 

cp package.json publish/

cd publish

npm publish

cd ../

rm -rf publish