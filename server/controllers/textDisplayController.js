const request = require('request');
const dotenv = require('dotenv')
const {httpRequestsTotal, httpRequestsDurationSeconds} = require("../controllers/monitoringController")

dotenv.config()

const category = 'inspirational';
exports.displayText = (req, res) => {
    if (req) {
        const start = new Date()
        request.get({
            url: `https://api.api-ninjas.com/v1/quotes?category=${category}`,
            headers: {
              'X-Api-Key': process.env.QUOTE_API_KEY
            },
          }, (error, response, body) => {
            if(error) {
                console.error('Request failed:', error);
                res.status(response.statusCode).json({message : "error_occurred"})
            }else if(response.statusCode != 200) {
                console.error('Error:', response.statusCode, body.toString('utf8'));
                res.status(response.statusCode).json({message : "error_occurred"})
            }else {
                console.log(JSON.parse(body))
                res.status(200).json({message : JSON.parse(body)})
            }
        });
        const end = new Date() - start
        httpRequestsDurationSeconds.observe(end/1000)
        httpRequestsTotal.inc()
    }
}