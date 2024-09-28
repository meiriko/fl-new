import {
  QueryGenqlSelection,
  Query,
  Mutation,
  Client,
  MutationGenqlSelection,
} from "./services/GraphQL/__generated__";

export type QueryKey = keyof QueryGenqlSelection & keyof Query;
export type MutationKey = keyof MutationGenqlSelection & keyof Mutation;

type AtLeastOneField<T> = {
  [K in keyof T]: Required<Pick<T, K>>;
}[keyof T] &
  T;

type NonEmptySelection<K extends QueryKey> = AtLeastOneField<
  QuerySelectionByKey<K>
>;

type NonEmptyMutationSelection<K extends MutationKey> = AtLeastOneField<
  MutationSelectionByKey<K>
>;

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

type ProvidedRequiredAsOptional<
  Type,
  SubType extends Partial<Type> | undefined,
> = Partial<Pick<Type, keyof SubType & keyof Type>> & Omit<Type, keyof SubType>;

type ServiceInput<T> = T extends { __args: { input: infer U } } ? U : never;

export type QueryInputByKey<K extends keyof QueryGenqlSelection> = ServiceInput<
  QueryGenqlSelection[K]
>;

export type MutationInputByKey<K extends keyof MutationGenqlSelection> =
  ServiceInput<MutationGenqlSelection[K]>;

export type QuerySelectionByKey<K extends keyof QueryGenqlSelection> = Omit<
  NonNullable<QueryGenqlSelection[K]>,
  "__args"
>;

export type MutationSelectionByKey<K extends keyof MutationGenqlSelection> =
  Omit<NonNullable<MutationGenqlSelection[K]>, "__args">;

export type QueryArgs<
  K extends QueryKey,
  S extends QuerySelectionByKey<K> | undefined = undefined,
  I extends Partial<QueryInputByKey<K>> | undefined = undefined,
> = keyof S extends never
  ? keyof I extends never
    ? [
        input: QueryInputByKey<K>,
        selection: NonEmptySelection<K>,
        name?: string,
      ]
    : Exclude<RequiredKeys<QueryInputByKey<K>>, keyof I> extends never
      ? [
          input: Partial<QueryInputByKey<K>> | undefined,
          selection: NonEmptySelection<K>,
          name?: string,
        ]
      : [
          input: ProvidedRequiredAsOptional<QueryInputByKey<K>, I>,
          selection: NonEmptySelection<K>,
          name?: string,
        ]
  : keyof I extends never
    ? [
        input: QueryInputByKey<K>,
        selection?: QuerySelectionByKey<K> | undefined,
        name?: string,
      ]
    : Exclude<RequiredKeys<QueryInputByKey<K>>, keyof I> extends never
      ? [
          input?: Partial<QueryInputByKey<K>>,
          selection?: QuerySelectionByKey<K>,
          name?: string,
        ]
      : [
          input: ProvidedRequiredAsOptional<QueryInputByKey<K>, I>,
          selection?: QuerySelectionByKey<K> | undefined,
          name?: string,
        ];

export type MutationArgs<
  K extends keyof MutationGenqlSelection & keyof Mutation,
  S extends MutationSelectionByKey<K> | undefined = undefined,
  I extends Partial<MutationInputByKey<K>> | undefined = undefined,
> = keyof S extends never
  ? keyof I extends never
    ? [
        input: MutationInputByKey<K>,
        selection: NonEmptyMutationSelection<K>,
        name?: string,
      ]
    : Exclude<RequiredKeys<MutationInputByKey<K>>, keyof I> extends never
      ? [
          input: Partial<MutationInputByKey<K>> | undefined,
          selection: NonEmptyMutationSelection<K>,
          name?: string,
        ]
      : [
          input: ProvidedRequiredAsOptional<MutationInputByKey<K>, I>,
          selection: NonEmptyMutationSelection<K>,
          name?: string,
        ]
  : keyof I extends never
    ? [
        input: MutationInputByKey<K>,
        selection?: MutationSelectionByKey<K> | undefined,
        name?: string,
      ]
    : Exclude<RequiredKeys<MutationInputByKey<K>>, keyof I> extends never
      ? [
          input?: Partial<MutationInputByKey<K>>,
          selection?: MutationSelectionByKey<K>,
          name?: string,
        ]
      : [
          input: ProvidedRequiredAsOptional<MutationInputByKey<K>, I>,
          selection?: MutationSelectionByKey<K> | undefined,
          name?: string,
        ];

async function runQueryOnClient<
  K extends QueryKey,
  S extends QuerySelectionByKey<K> | undefined,
  const I extends Partial<QueryInputByKey<K>> | undefined,
>(
  client: Client,
  q: K,
  defaultSelection: (S & QuerySelectionByKey<K>) | undefined,
  defaultInput: I | undefined,
  [input, selection, name]: QueryArgs<K, S, I>,
): Promise<Query[K]> {
  const args = {
    __name: name,
    [q]: {
      __args: {
        input: {
          ...defaultInput,
          ...input,
        },
      },
      ...defaultSelection,
      ...selection,
    },
  };
  const { [q]: result } = await client.query(args);
  return result as Query[K];
}

async function runMutationOnClient<
  K extends MutationKey,
  S extends MutationSelectionByKey<K> | undefined,
  const I extends Partial<MutationInputByKey<K>> | undefined,
>(
  client: Client,
  q: K,
  defaultSelection: (S & MutationSelectionByKey<K>) | undefined,
  defaultInput: I | undefined,
  [input, selection, name]: MutationArgs<K, S, I>,
): Promise<Mutation[K]> {
  const args = {
    __name: name,
    [q]: {
      __args: {
        input: {
          ...defaultInput,
          ...input,
        },
      },
      ...defaultSelection,
      ...selection,
    },
  };
  const { [q]: result } = await client.mutation(args);
  return result as Mutation[K];
}

export function toQueryFromClient(client: Client) {
  return function <
    K extends QueryKey,
    S extends QuerySelectionByKey<K> | undefined = undefined,
    const I extends Partial<QueryInputByKey<K>> | undefined = undefined,
  >(q: K, defaultSelection?: S & QuerySelectionByKey<K>, defaultInput?: I) {
    return async (...baseArgs: QueryArgs<K, S, I>) => {
      return runQueryOnClient<K, S, I>(
        client,
        q,
        defaultSelection,
        defaultInput,
        baseArgs,
      );
    };
  };
}

export function toMutationFromClient(client: Client) {
  return function <
    K extends keyof MutationGenqlSelection & keyof Mutation,
    S extends MutationSelectionByKey<K> | undefined = undefined,
    const I extends Partial<MutationInputByKey<K>> | undefined = undefined,
  >(q: K, defaultSelection?: S & MutationSelectionByKey<K>, defaultInput?: I) {
    return async (...baseArgs: MutationArgs<K, S, I>) => {
      return runMutationOnClient<K, S, I>(
        client,
        q,
        defaultSelection,
        defaultInput,
        baseArgs,
      );
    };
  };
}

export function toQuery<
  K extends QueryKey,
  S extends QuerySelectionByKey<K> | undefined = undefined,
  const I extends Partial<QueryInputByKey<K>> | undefined = undefined,
>(
  client: Client,
  q: K,
  defaultSelection?: S & QuerySelectionByKey<K>,
  defaultInput?: I,
) {
  return async (...baseArgs: QueryArgs<K, S, I>) => {
    return runQueryOnClient(
      client,
      q,
      defaultSelection,
      defaultInput,
      baseArgs,
    );
  };
}
