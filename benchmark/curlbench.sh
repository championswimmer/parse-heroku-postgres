#!/usr/bin/env bash
DB=$1
rm ./$DB*.txt
curl_post() {
    curl -s -w "%{time_total}\n" -o /dev/null --request POST \
          --url http://localhost:1337/parse/classes/Test \
          --header 'cache-control: no-cache' \
          --header 'content-type: application/json' \
          --header 'postman-token: 2f344f44-6ace-53d4-dee2-2b05d23dfed2' \
          --header 'x-parse-application-id: an-example-app-id' \
          --header 'x-parse-rest-api-key: undefined' \
          --data "{\"testValue\": $1}"
}

curl_post_bench () {
    echo 'benchmark create object 1000 times'
    for i in {1..1000}
    do
        curl_post $i
    done
}

curl_get() {
    curl -s -w "%{time_total}\n" -o /dev/null --request GET \
          --url http://localhost:1337/parse/classes/Test \
          --header 'cache-control: no-cache' \
          --header 'content-type: application/json' \
          --header 'postman-token: 2f344f44-6ace-53d4-dee2-2b05d23dfed2' \
          --header 'x-parse-application-id: an-example-app-id' \
          --header 'x-parse-rest-api-key: undefined' \
          --data-urlencode "where={\"testValue\":$1}"
}

curl_get_bench () {
    echo 'benchmark get(where) object 1000 times'
    for i in {1..1000}
    do
        curl_post $i
    done
}
BENCH_OUT="${DB}_benchmark"


echo '==== postgres benchmark create ====' >> "${BENCH_OUT}"
(time { curl_post_bench; }) > post_each.txt 2>> "${BENCH_OUT}"
echo '  = = = = =  = =  = = = = = = = = =  ' >> "${BENCH_OUT}"

echo '==== postgres benchmark get(where)==== ' >> "${BENCH_OUT}"
(time { curl_get_bench; }) > get_each.txt 2>> "${BENCH_OUT}"
echo '  = = = = =  = =  = = = = =  = = = =  ' >> "${BENCH_OUT}"
