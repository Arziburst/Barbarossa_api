<!-- local -->

npm i

.env {
    APP_NAME
    NODE_ENV
    PORT
}

npm run build

docker build -t arziburst/barbarossa_graphql .

docker push arziburst/barbarossa_graphql

<!-- droplet -->

docker pull arziburst/barbarossa_graphql

docker tag arziburst/barbarossa_graphql dokku/graphql

dokku tags:deploy graphql

<!-- Dokku fast docs -->
dokku [module]:[report|help] 

sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres

sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git 

dokku postgres:create db

dokku postgres:[unexpose|expose] db [?port]

dokku apps:create [dokkuContainerName]

dokku postgres:link db [dokkuContainerName]

dokku config:set [dokkuContainerName] [key=value] [key=value]...

dokku domains:[add|remove][?-global] [?dokkuContainerName] [domain]

dokku proxy:ports-[add|remove|clear] [dokkuContainerName] [?http:[port:port]]

dokku letsencrypt [dokkuContainerName]