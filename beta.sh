#!/bin/bash
source ~/.bash_profile

CYAN='\033[36;1m'
YELLOW='\033[33;1m'
NC='\033[0m'

echo "getting beta version ..."

releases=$(glab release list)
version=$(node $REPOS/beta/beta.js $(pwd) $releases)
branch=$(git rev-parse --abbrev-ref HEAD)

echo "NEW BETA VERSION FOUND: $version"

npm i
git add .
git commit -m $version
git push origin $branch -f

git tag $version
git push origin $version

echo -e "${YELLOW} creating a release ... ${NC}"

ISSUE_NUMBER=$(echo $branch | tr -dc '0-9')

glab release create $version --ref $branch --name $version
# glab mr update -d "closes #$($ISSUE_NUMBER) - test with \`$version\`."

echo -e "${CYAN} ================================ ${NC}"
echo -e "${CYAN} 🎉 $version publishing in progress! 🎉 ${NC}"
echo -e "${CYAN} ================================ ${NC}"

echo ' '
echo -e "${YELLOW} restoring version ${NC}"
echo ' '

node $REPOS/beta/restore.js $(pwd)

npm i
git add .
git commit -m 'restore'

git reset --soft HEAD~2

git push origin $branch -f

echo -e "${YELLOW} DONE! ${NC}"

while true
do
  clear -x
  glab ci list -P ${1:-5}
  sleep 5
done