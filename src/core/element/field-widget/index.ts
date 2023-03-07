const comps: Record<string, any> = {};

type RequireContext = ReturnType<typeof require.context>;

const requireComponent: RequireContext = require.context('./', false, /\w+\.vue$/);

requireComponent.keys().forEach((fileName: string) => {
  // Use type assertions to avoid TypeScript errors
  const comp: any = requireComponent(fileName).default;
  comps[comp.name] = comp;
});

export default comps;
