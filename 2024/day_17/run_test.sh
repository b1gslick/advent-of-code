#!/bin/bash
cmake -S . -B build || true
cmake --build build
cd ./build && ctest --output-on-failure

cd ..
