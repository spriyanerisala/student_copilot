const https = require('https');

function getLeetCodeProblem(titleSlug) {
  return new Promise((resolve, reject) => {
    const query = {
      operationName: 'questionData',
      variables: { titleSlug },
      query: 'query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { content } }'
    };
    
    const postData = JSON.stringify(query);
    
    const options = {
      hostname: 'leetcode.com',
      port: 443,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    
    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function run() {
  try {
    const res = await getLeetCodeProblem('two-sum');
    console.log(res.data.question.content.substring(0, 500));
  } catch(e) {
    console.error(e);
  }
}
run();
