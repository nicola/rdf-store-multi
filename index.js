module.exports = MultiStore
var AbstractStore = require('rdf-store-abstract')
var util = require('util')

function MultiStore (options) {
  var self = this

  options = options || {}
  self.router = options.router
}
util.inherits(MultiStore, AbstractStore)

MultiStore.prototype.graph = function (iri, callback, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('graph', arguments, function (err, store) {
      if (err) return callback(err)
      store.graph(iri, callback, options)
    })
  })
}

MultiStore.prototype.match = function (iri, subject, predicate, object, callback, limit, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('match', arguments, function (err, store) {
      if (err) return callback(err)
      store.match(iri, subject, predicate, object, callback, limit, options)
    })
  })
}

MultiStore.prototype.add = function (iri, graph, callback, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('add', arguments, function (err, store) {
      if (err) return callback(err)
      store.add(iri, graph, callback, options)
    })
  })
}

MultiStore.prototype.merge = function (iri, graph, callback, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('merge', arguments, function (err, store) {
      if (err) return callback(err)
      store.merge(iri, graph, callback, options)
    })
  })
}

MultiStore.prototype.remove = function (iri, graph, callback, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('remove', arguments, function (err, store) {
      if (err) return callback(err)
      store.remove(iri, graph, callback, options)
    })
  })
}

MultiStore.prototype.removeMatches = function (iri, subject, predicate, object, callback, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('removeMatches', arguments, function (err, store) {
      if (err) return callback(err)
      store.removeMatches(iri, subject, predicate, object, callback, options)
    })
  })
}

MultiStore.prototype.delete = function (iri, callback, options) {
  var self = this

  return new Promise(function (resolve, reject) {
    callback = combinedCallback(resolve, reject, callback)
    self.router('delete', arguments, function (err, store) {
      if (err) return callback(err)
      store.delete(iri, callback, options)
    })
  })
}

function combinedCallback (resolve, reject, callback) {
  return function (error, result) {
    if (!error) {
      if (callback) {
        callback(null, result)
      }
      resolve(result)
    } else {
      if (callback) {
        callback(error)
      }
      reject(error)
    }
  }
}
