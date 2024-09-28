import {
  QueryGenqlSelection,
  Query,
  Client,
} from "./services/GraphQL/__generated__";

export type QueryKey = keyof QueryGenqlSelection & keyof Query;

type AtLeastOneField<T> = {
  [K in keyof T]: Required<Pick<T, K>>;
}[keyof T] &
  T;

type NonEmptySelection<K extends QueryKey> = AtLeastOneField<
  QuerySelectionByKey<K>
>;

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

type ProvidedRequiredAsOptional<
  Type,
  SubType extends Partial<Type> | undefined,
> = Partial<Pick<Type, keyof SubType & keyof Type>> & Omit<Type, keyof SubType>;

type QueryInput<T> = T extends { __args: { input: infer U } } ? U : never;
export type QueryInputByKey<K extends keyof QueryGenqlSelection> = QueryInput<
  QueryGenqlSelection[K]
>;

export type QuerySelectionByKey<K extends keyof QueryGenqlSelection> = Omit<
  NonNullable<QueryGenqlSelection[K]>,
  "__args"
>;

export type ServiceArgs<
  K extends keyof QueryGenqlSelection & keyof Query,
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

async function runQueryOnClient<
  K extends keyof QueryGenqlSelection & keyof Query,
  S extends QuerySelectionByKey<K> | undefined,
  const I extends Partial<QueryInputByKey<K>> | undefined,
>(
  client: Client,
  q: K,
  defaultSelection: (S & QuerySelectionByKey<K>) | undefined,
  defaultInput: I | undefined,
  [input, selection, name]: ServiceArgs<K, S, I>,
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

export function toServiceFromClient(client: Client) {
  return function <
    K extends keyof QueryGenqlSelection & keyof Query,
    S extends QuerySelectionByKey<K> | undefined = undefined,
    const I extends Partial<QueryInputByKey<K>> | undefined = undefined,
  >(q: K, defaultSelection?: S & QuerySelectionByKey<K>, defaultInput?: I) {
    return async (...baseArgs: ServiceArgs<K, S, I>) => {
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

export function toService<
  K extends keyof QueryGenqlSelection & keyof Query,
  S extends QuerySelectionByKey<K> | undefined = undefined,
  const I extends Partial<QueryInputByKey<K>> | undefined = undefined,
>(
  client: Client,
  q: K,
  defaultSelection?: S & QuerySelectionByKey<K>,
  defaultInput?: I,
) {
  return async (...baseArgs: ServiceArgs<K, S, I>) => {
    return runQueryOnClient(
      client,
      q,
      defaultSelection,
      defaultInput,
      baseArgs,
    );
  };
}
