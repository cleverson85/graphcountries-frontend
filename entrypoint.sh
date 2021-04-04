#!/bin/sh

echo "Iniciando entrypoint - RUNTIME"

echo "--- Variáveis de ambiente ---"
printenv | sort
echo "-----------------------------"

envsubst < "/usr/share/nginx/html/assets/config/config.json" > "/usr/share/nginx/html/assets/config/config-docker.json"

echo "--- Configurações das variáveis de ambiente utilizadas ---"
cat /usr/share/nginx/html/assets/config/config-docker.json
echo "----------------------------------------------------------"

nginx -g "daemon off;"
