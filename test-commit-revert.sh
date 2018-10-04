#!/usr/bin/env bash
#
# test && commit || revert
#   Commit all changes only if all tests pass. Otherwise revert code
#   to starting point.
#   Tool for npm and git.
#
# Usage:
#   $ ./test-commit-revert.sh "Content of commit message"
#
# Copyright (c) 2018 Maciej Żok <maciek.zok@gmail.com>
# MIT License (http://opensource.org/licenses/MIT)

set -o errexit
set -o nounset
set -o pipefail

has_commit_msg="${#} -gt 0"
commit_msg=${@}

if [ ! ${has_commit_msg} ]; then
  echo "ERROR: No commit message"
  exit 64  # command line usage error (via /usr/include/sysexits.h)
fi

git add --all

npm test && git commit --all --message="${commit_msg}" || (echo "ERROR: Tests failed -> revert all changes"; git reset --hard)
