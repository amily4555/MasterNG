#!/usr/bin/env bash

_ov=`npm view masterng version`

echo '::: 升级版本号'
    cd ./publish
    npm version patch
    cd ..

echo ':::::: 推送到NPM'
    npm publish publish

if [ $? -eq 0 ]; then
    echo '::::::::: 将package.json写回主项目'
        cp -R ./publish/package.json ./package.json

    echo ':::::::::::: 将编译结果提交到Git'
        _uv=`npm view masterng version`

    git add .
    git commit -am "$_ov -> $_uv"
    git pull
    git push

    echo ':::::::::::: Git Tag'

    git tag $_uv
    git push --tags
fi