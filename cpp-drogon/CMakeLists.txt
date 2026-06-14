cmake_minimum_required(VERSION 3.14)
project(cpp-drogon CXX)

# Find Drogon dependency
find_package(Drogon CONFIG REQUIRED)

add_executable(${PROJECT_NAME} main.cc)
target_link_libraries(${PROJECT_NAME} PRIVATE Drogon::Drogon)
