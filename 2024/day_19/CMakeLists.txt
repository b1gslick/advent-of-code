cmake_minimum_required(VERSION 3.14)
project(day_19)

# GoogleTest requires at least C++14
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

enable_testing()
set(HEADERS ${CMAKE_CURRENT_SOURCE_DIR}/day_19.h)
set(SOURCE ${CMAKE_CURRENT_SOURCE_DIR}/day_19.cpp)

add_executable(
  day_19_test
  day_19_test.cc
  ${PROJECT_NAME}
  ${HEADERS}
  ${SOURCE}
)
target_link_libraries(
  day_19_test
  GTest::gtest_main
)

include(GoogleTest)
gtest_discover_tests(day_19_test)
