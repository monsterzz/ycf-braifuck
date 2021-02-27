const { readFileSync } = require('fs');
const { Readable } = require('stream');
const bf = require('brainfuck');

let program = undefined;

function init() {
    if (program !== undefined) return;

    program = readFileSync(process.env['PROGRAM'] || 'program.bf');
}

function getInput(event) {
    if (!event) {
        return { isHttp: false, input: '' };
    }

    let isHttp = event.hasOwnProperty('httpMethod');

    if (!isHttp) {
        return { isHttp: false, input: event.toString() };
    }

    let body = event['body'];
    if (!event['isBase64Encoded']) {
        return body || '';
    }

    body = new Buffer(body, 'base64').toString('ascii');
    return { isHttp: true, input: body };
}

async function handler(event, context) {
    init();

    let {isHttp, input} = getInput(event);
    process.stdin = Readable.from(input.split(''));

    let output = await new Promise((resolve, reject) => {
        bf.exec(program.toString(), (err, output) => {
            if (err) return reject(err);
            return resolve(output);
        });
    });

    if (isHttp) {
        return {
            'statusCode': 200,
            'body': output,
        };
    } else {
        return output;
    }
}

module.exports = {
    handler
};
