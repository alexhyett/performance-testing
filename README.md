# performance-testing
The code from my YouTube video on "How to do Performance Testing with k6"

You first need to run the API:
```sh
cd src
dotnet run
```

Then in a seperate terminal window run the tests using the commands below.

I have added a HOSTNAME variable to each of the scripts which needs to be added when running them.

## Simple Test
```sh
k6 run -e HOSTNAME=localhost:5157 tests/simple-test.js
```

## Stress Test
```sh
k6 run -e HOSTNAME=localhost:5157 tests/stress-test.js
```

## Spike Test
```sh
k6 run -e HOSTNAME=localhost:5157 tests/spike-test.js
```

## Load Test
```sh
k6 run -e HOSTNAME=localhost:5157 tests/load-test.js
```

## Soak Test
```sh
k6 run -e HOSTNAME=localhost:5157 tests/soak-test.js
```