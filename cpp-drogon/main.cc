#include <drogon/drogon.h>

int main() {
    drogon::app().registerHandler("/", [](const drogon::HttpRequestPtr& req, std::function<void(const drogon::HttpResponsePtr&)>&& callback) {
        auto resp = drogon::HttpResponse::newHttpResponse();
        resp->setBody("Hello World!");
        callback(resp);
    });

    drogon::app().addListener("0.0.0.0", 8080).run();
    return 0;
}
