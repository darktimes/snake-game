git branch -D gh-pages
npm run build --prod
git checkout -b gh-pages
mkdir repo
move * repo
move repo/dist/* .
rm -r repo
git push --set-upstream origin gh-pages
git checkout main