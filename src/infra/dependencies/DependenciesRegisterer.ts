// TODO: find way to use template
// export class DependenciesRegisterer {
//   dependencies: Record<string, any>;

//   constructor() {
//     this.dependencies = {};
//   }

//   add<T>(dependency: T): void {
//     if (this.dependencies[T]) {
//       throw new Error(`Dependency already registered: ${typeof T}`);
//     }

//     this.dependencies[T] = dependency;
//   }

//   get<T>(): void {
//     if (!this.dependencies[T]) {
//       throw new Error(`Dependency not registered: ${T}`);
//     }

//     return this.dependencies[T];
//   }
// }
