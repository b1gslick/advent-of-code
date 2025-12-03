CC=gcc
CFLAGS=-std=c99 -Wall
# additional flags for gcov
TESTFLAGS=-fprofile-arcs -ftest-coverage
all: test

default: day_3.c day_3.h
	$(CC) $(CFLAGS) -o day_3 day_3.c

test: test.c  test.h day_3.c day_3.h
	# build the test
	$(CC) $(CFLAGS) $(TESTFLAGS) -o test test.c day_3.c
	# run the test, will generate test-counter.gcna and test-counter.gcno
	./test
	# compute how test is covering counter.c
	gcov -c -p test-test
clean:
	rm -f *.o test *.gcov *.gcda *.gcno
