CC=gcc
CFLAGS=-std=c99 -Wall
# additional flags for gcov
TESTFLAGS=-fprofile-arcs -ftest-coverage
all: test

default: day_16.c day_16.h
	$(CC) $(CFLAGS) -o day_16 day_16.c

test: test.c  test.h day_16.c day_16.h
	# build the test
	$(CC) $(CFLAGS) $(TESTFLAGS) -o test test.c day_16.c
	# run the test, will generate test-counter.gcna and test-counter.gcno
	./test
	# compute how test is covering counter.c
	gcov -c -p test-test
clean:
	rm -f *.o test *.gcov *.gcda *.gcno
