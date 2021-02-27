## Yandex Cloud Functions / Brainfuck

This example shows how to do fun things with serverless.

### Pre-requisites

To deploy and run Cloud Functions you need to have CLI (`yc`) installed and configured. Refer to platform documentation
for detailed guide.

### Yandex Cloud Functions

Create new function:

    $ yc serverless function create --name brainfuck
    done (1s)
    id: d4e00000000000000000
    folder_id: b1g00000000000000000
    created_at: "2020-03-02T18:26:59.866Z"
    name: brainfuck
    log_group_id: ckg00000000000000000
    http_invoke_url: https://functions.yandexcloud.net/d4e00000000000000000
    status: ACTIVE

Then you need to create new version:

    $ yc serverless function version create --function-name brainfuck \
        --runtime nodejs14 \
        --entrypoint index.handler \
        --memory 128MB \
        --execution-timeout 60s \
        --source-path .

Now you can test your function:

    $ yc serverless function invoke brainfuck
    Hello World!
    
To change brainfuck program executed, just change `program.bf` or add environment variable `PROGRAM` with required filename.

Have fun!
