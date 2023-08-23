//const client = require('../utils/monitoringUtils')
const client = require('prom-client')

const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({timeout:5000})

const httpRequestsTotal = new client.Counter({
  name: 'http_request_operations_total',
  help: 'Total number of Http requests'
})

const httpRequestsDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of Http requests in seconds',
  buckets: [0.1, 0.5, 2, 5, 10]
})

const sendMetrics = async(req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
}

module.exports = {httpRequestsTotal, httpRequestsDurationSeconds, sendMetrics}