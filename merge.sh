#! /bin/bash
# Merge pushes to development branch to stable branch
if [ ! -n $GITHUB_TOKEN ] ; then
  echo "Please set GITHUB_TOKEN"
  exit 1;
fi

# Specify the development branch and stable branch names
TO_BRANCH="master"

# Get the current branch
export PAGER=cat

# Create the URL to push merge to 
URL=$(git remote -v | head -n1 | cut -f2 | cut -d" " -f1)
echo "Repo url is $URL"
PUSH_URL="https://$GITHUB_TOKEN:$GIT_PASS@${URL:6}"
# Checkout the dev branch
#git checkout $FROM_BRANCH && \
#echo "Checking out $TO_BRANCH..." && \
git checkout $TRAVIS_BRANCH .
# Checkout the latest stable
git fetch origin $TO_BRANCH:$TO_BRANCH && \
git checkout $TO_BRANCH && \

# Merge the dev into latest stable
echo "Merging changes..." && \
git merge $TRAVIS_BRANCH && \

# Push changes back to remote vcs
echo "Pushing changes..." && \
git push $PUSH_URL && \
echo "Merge complete!" || \
echo "Error Occurred. Merge failed"
