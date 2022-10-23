const {alias, aliasJest} = require('react-app-rewire-alias')

const aliasMap = {
   "@": "src",
   "@components": "src/components",
   "@sections": "src/components/sections",
   "@views": "src/views",
   "@assets":"src/assets",
   "@config":"src/config",
   "@rdx":"src/redux",
   "@routers":"src/routers",
   "@service":"src/service",
   "@models":"src/service/models",
   "@toolbox":"src/toolbox",
   "@constants":"src/toolbox/constants",
   "@defaults":"src/toolbox/defaults",
   "@helpers":"src/toolbox/helpers",
   "@hooks":"src/toolbox/hooks",
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)
