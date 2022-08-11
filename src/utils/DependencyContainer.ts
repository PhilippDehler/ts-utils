/**
 * Author: Andreas Roth
 * */
export class DependencyContainer<TDependencies extends {}> {
  constructor(private readonly deps: TDependencies = {} as TDependencies) {}

  add<TName extends string, TValue>(
    name: TName,
    getValue: (deps: {
      [Key in keyof TDependencies]: TDependencies[Key];
    }) => TValue,
  ): DependencyContainer<
    TDependencies & {
      [x in TName]: TValue;
    }
  > {
    return new DependencyContainer({
      ...this.deps,
      [name]: getValue(this.deps),
    }) as any;
  }

  dependencies(): { [Key in keyof TDependencies]: TDependencies[Key] } {
    return this.deps;
  }
}
