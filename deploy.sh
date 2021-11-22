#!/bin/bash

echo "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo -d docs -t PaperMod --minify

# Staging
git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git push origin master

echo "\033[0;32mhttps://1TiB.github.io/\033[0m"



# Permanent authentication
# git config credential.helper store
# git push https://github.com/<Your Repo ID>

# Username for 'https://github.com': <USERNANE>
# Password for 'https://USERNAME@github.com': <PASSWORD>

# caching expire
# git config --global credential.helper 'cache --timeout 7200'