#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/dist

# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

git init
git remote add origin https://github.com/keeperdog/keeperdog.github.io.git
git add -A
git commit -m 'deploy'
yarn config set "strict-ssl" false

# git config pull.rebase true
# git pull https://github.com/keeperdog/keeperdog.github.io.git main
# git push -f https://github.com/keeperdog/keeperdog.github.io.git main

# 如果你想要部署到 https://USERNAME.github.io
# git push -f https://github.com/keeperdog/keeperdog.github.io.git main
# 另一种方式亦可
# git config pull.rebase true
# git pull origin main

git push -f --set-upstream origin main 

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -
# 请不要随便修改此条危险命令
rm -rf docs/dist