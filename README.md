<!-- local -->

npm i

.env {
    APP_NAME
    NODE_ENV
    PORT
    POSTGRES_USER
    POSTGRES_PASSWORD
    POSTGRES_DB
    DATABASE_URL
}

npm run build

docker build -t arziburst/barbarossa_api .

docker push arziburst/barbarossa_api

<!-- droplet -->

docker pull arziburst/barbarossa_api

docker tag arziburst/barbarossa_api dokku/api

dokku tags:deploy api

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