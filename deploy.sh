set -e

echo "Ingrese commit:"
read commit

npm run build

cd dist

git init
git add -A
git commit -m "$textoIngresado"

git push -f https://github.com/marcelo170690/payments.git main:gh-pages

echo "El proyecto fue lanzado!!!"

cd -