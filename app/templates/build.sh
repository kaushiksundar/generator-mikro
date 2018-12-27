for d in */ ; do
    echo "$d"
    cd $d
    yarn install
    cd ..
done

# Build container images
docker-compose build

# up all the services
docker-compose up -d