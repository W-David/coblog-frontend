import service from './request'

const GET = config =>
  service
    .get(config.url, config)
    .then(res => [null, res])
    .catch(err => [err, null])

const POST = config =>
  service
    .post(config.url, config)
    .then(res => [null, res])
    .catch(err => [err, null])

const PATCH = config =>
  service
    .patch(config.url, config)
    .then(res => [null, res])
    .catch(err => [err, null])

const PUT = config =>
  service
    .put(config.url, config)
    .then(res => [null, res])
    .catch(err => [err, null])

const DELETE = config =>
  service
    .delete(config.url, config)
    .then(res => [null, res])
    .catch(err => [err, null])

const UPDATE = config =>
  service
    .update(config.url, config)
    .then(res => [null, res])
    .catch(err => [err, null])

export default {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  UPDATE
}
