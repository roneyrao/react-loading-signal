module.exports = function () {
  return {
    visitor: {
      ExportNamedDeclaration: function (path) {
        const node = path.node;
        if (node.source && node.source.value.endsWith('.css')) {
          node.source.value = '.' + node.source.value;
        }
      }
    }
  };
}
