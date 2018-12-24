for d in */ ; do
    echo "$d"
    cd $d
    yarn install
    cd ..
done