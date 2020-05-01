#!/bin/sh

#Affichage des catÃ©gorie
echo '------------------------------------------------------------------------------'
echo "Affichage des catÃ©gries"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la premiÃ¨re catÃ©gorie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catÃ©gorie inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/1234
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation de la catÃ©gorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation d'un double la catÃ©gorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Mise Ã  jour de la catÃ©gorie 100 : $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catÃ©gorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Suppression de la catÃ©goie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/100
echo
echo
echo '------------------------------------------------------------------------------'
echo "Suppression d'une catÃ©gorie inexistante 1234"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catÃ©gorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage du nom de la catÃ©gorie 1"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/name/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la derniere modification de la catÃ©gorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/mod/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de toutes les bieres"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/beer
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la biere 5"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/beer/5
echo
echo '------------------------------------------------------------------------------'
echo "Affichage du style des bieres"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/style
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bieres aux degres proches de 10 + - 1"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/degre/10
echo
echo '------------------------------------------------------------------------------'
echo "Affichage les descriptions de toutes les bieres"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/desc
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la description de la biere 1"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/desc/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des endroits de provenancess des bieres"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/pays
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la provenance de la biere 1"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/pays/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de toutes les bieres venant du meme pays"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/pays/pays/France
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de toutes les brasseries"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/brewery
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la premiere brasserie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de toutes les brasseries du meme pays"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/pays/France
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des info de la brasserie 1"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/info/Brasserie%20Duyck
echo
