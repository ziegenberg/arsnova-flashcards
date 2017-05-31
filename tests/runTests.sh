#!/bin/bash

# Default path definitions
searchDir="tests/features/*"
dumpDir="tests/dump/meteor"

if [ -z "$POST" ]; then
	PORT=3000
fi
if [ -z "$MONGO_HOST" ]; then
	MONGO_HOST=localhost
	MONGO_PORT=3001
	MONGO_DB=meteor
elif [ -z "$MONGO_PORT" ]; then
	MONGO_PORT=27017
fi

#colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if the script was startet from project root direcotry
function checkDirectory
{
	if [ $(basename $PWD) == "tests" ]; then
		echo -e $RED"$0 musst me called from project root!" $NC
		exit 5
	fi
}


# Exit value, set to -1 when chimp test fails
exitVal=0
successfulTests=0
failedTests=0
failedTestsArray=()

checkDirectory

# step through any subdirectory of tests/features and
# - restore meteor database
# - run chimp
# - drop meteor database
for testDir in $searchDir; do
	if [ -d $testDir ]; then
		echo -e $BLUE"Entering directory $testDir" $NC

		# Drop and Restore the database
		echo -e $GREEN"Dropping and Restoring database ..." $NC
		if ! mongorestore --drop -h "$MONGO_HOST" --port "$MONGO_PORT" -d "$MONGO_DB" $dumpDir 1> /dev/null; then
			echo -e $RED"mongorestore failed!" $NC
			exit 2
		fi

		# Run chimp
		echo -e $GREEN"Running chimp ..." $NC
		if [ $DISPLAY -n ] ; then
        		xvfb-run --server-args="-screen 0 1920x1080x16" chimp --ddp=http://localhost:3000 --path=$testDir $1
		else
			chimp --ddp=http://localhost:$PORT --path=$testDir $1
		fi
		if [ $? -ne 0 ]; then
			failedTests=$((failedTests+1))
			failedTestsArray+=("$testDir")
			echo -e $RED"Chimp test failed!" $NC
			exitVal=1
		else
			successfulTests=$((successfulTests+1))
		fi
	fi
done

echo -e $BLUE"Testing result:" $NC
echo -e $GREEN"Successfull tests: $successfulTests" $NC
echo -e $RED"Failed tests: $failedTests" $NC

for test in $failedTestsArray; do
	echo -e $RED $test $NC
done

exit $exitVal

