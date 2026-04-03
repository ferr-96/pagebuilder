import { registry } from '../blocks/registry';

export default function BlockRenderer({ block }) {
  const Component = registry.getComponent(block.type);
  if (!Component) {
    return (
      <div className="p-4 bg-danger/10 border border-danger/30 rounded text-danger text-sm">
        Unknown block type: {block.type}
      </div>
    );
  }
  return <Component block={block} />;
}
