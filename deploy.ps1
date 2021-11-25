git branch -D gh-pages
git push origin --delete gh-pages
npm install
npm run build --prod
git checkout -b gh-pages
mkdir repo
move * repo
move repo/dist/* .
rm -r repo
git add .
git commit -m "deploy"
git push --set-upstream origin gh-pages
git checkout main