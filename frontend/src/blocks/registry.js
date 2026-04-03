const definitions = new Map();
const components = new Map();

export const registry = {
  register(definition, component) {
    definitions.set(definition.type, definition);
    components.set(definition.type, component);
  },

  getDefinition(type) {
    return definitions.get(type);
  },

  getComponent(type) {
    return components.get(type);
  },

  getAllDefinitions() {
    return Array.from(definitions.values());
  },

  getByCategory(category) {
    return this.getAllDefinitions().filter(d => d.category === category);
  },

  getCategories() {
    const cats = new Set(this.getAllDefinitions().map(d => d.category));
    return Array.from(cats);
  },
};
