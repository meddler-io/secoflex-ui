ng build --prod --output-path=/Users/meddler/Documents/GitHub/face
cd /Users/meddler/Documents/GitHub/face
git init
git remote add origin git@github.com:meddler-xyz/face.git 
git checkout -b main
echo "meddler.io" > CNAME
cp index.html 404.html
git add .
git commit -m "Autoated Build"
git push --set-upstream origin main --force
