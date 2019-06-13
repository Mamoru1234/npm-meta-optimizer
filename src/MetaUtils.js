const { mapValues, omit } = require('lodash');

const PACKAGE_OMIT_FIELDS = [
  'keywords',
  'bugs',
  'users',
  'repository',
  'author',
  'maintainers',
  'readme',
  '_rev',
  'contributors'
];

const PACKAGE_VERSION_OMIT_VERSION = [
  'contributors',
  'bugs',
  'maintainers',
  'homepage',
  'repository',
  'author',
  'keywords',
];

const DIST_OMIT_FIELDS = [
  'npm-signature',
  'unpackedSize',
  'fileCount',
];

function optimizePackageVersionMeta(versionMeta) {
  versionMeta.dist = omit(versionMeta.dist, DIST_OMIT_FIELDS);
  return omit(versionMeta, PACKAGE_VERSION_OMIT_VERSION);
}

function optimizePackageMeta(metadata) {
  metadata.versions = mapValues(metadata.versions, optimizePackageVersionMeta);
  return omit(metadata, PACKAGE_OMIT_FIELDS);
}

module.exports = {
  optimizePackageMeta,
};
