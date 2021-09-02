const request = require('request-promise');
const parser = require('fast-xml-parser');


async function generate() {
  const result = await request.get('https://plugins.jetbrains.com/plugins/list/?build=IU-211.7628.21');    
  const obj = await parser.parse(result);
  const categories = obj['plugin-repository']['category'];
  let count = 0;
  let plugins = [];
  for (const category of categories) {
    if (Array.isArray(category['idea-plugin'])) {
      for (plugin of category['idea-plugin']) {
          plugins.push({
            id: plugin.id,
            name: plugin.name
          });
          count += 1;
      }
    } else {
      const plugin = category['idea-plugin'];
      plugins.push({
        id: plugin.id,
        name: plugin.name
      });      
    }
  }

  // encoding 되어야하는 케이스
  for (plugin of plugins) {    
    request.get(`https://plugins.jetbrains.com/pluginManager?action=download&id=${encodeURIComponent(plugin.id)}&build=IU-211.7628.21`, (error, response, body) => {    
    // request.get(`https://plugins.jetbrains.com/pluginManager?action=download&id=537&build=IU-211.7628.21`, (error, response, body) => {
      console.log(`http://70.121.224.52:8081/repository/raw-plugins-jetbrains${response.req.path}`);
      sleep
    });
  }
}

generate();
