const jsonld = require('jsonld');

const config = require('./config');

const nodeDocumentLoader = jsonld.documentLoaders.node({
  secure: true,
  strictSSL: false
});

jsonld.documentLoader = (url, callback) => {
  if(url in config.constants.CONTEXTS) {
    return callback(
      null, {
        contextUrl: null,
        document: config.constants.CONTEXTS[url],
        documentUrl: url
      });
  }
  nodeDocumentLoader(url, callback);
};

exports.handler = (doc, context, callback) => jsonld.normalize(doc, {
  algorithm: 'URDNA2015',
  format: 'application/nquads'
}, callback);
