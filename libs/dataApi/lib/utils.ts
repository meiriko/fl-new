import {
  QueryGenqlSelection,
  Query,
  Client,
} from "./services/GraphQL/__generated__";

type AtLeastOneField<T> = {
  [K in keyof T]: Required<Pick<T, K>>;
}[keyof T] &
  T;

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

type ProvidedRequiredAsOptional<
  Type,
  SubType extends Partial<Type> | undefined,
> = Partial<Pick<Type, keyof SubType & keyof Type>> & Omit<Type, keyof SubType>;

type QueryInput<T> = T extends { __args: { input: infer U } } ? U : never;
type QueryInputByKey<K extends keyof QueryGenqlSelection> = QueryInput<
  QueryGenqlSelection[K]
>;

export type QuerySelectionType<K extends keyof QueryGenqlSelection> = Omit<
  Exclude<QueryGenqlSelection[K], undefined>,
  "__args"
>;

export type ServiceArgs<
  K extends keyof QueryGenqlSelection & keyof Query,
  S extends
    | Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">
    | undefined = undefined,
  I extends Partial<QueryInputByKey<K>> | undefined = undefined,
> = keyof S extends never
  ? keyof I extends never
    ? [
        input: QueryInputByKey<K>,
        selection: AtLeastOneField<QuerySelectionType<K>>,
        name?: string,
      ]
    : Exclude<RequiredKeys<QueryInputByKey<K>>, keyof I> extends never
      ? [
          // input?: ProvidedRequiredAsOptional<QueryInputByKey<K>, I>,
          input: Partial<QueryInputByKey<K>> | undefined,
          selection: AtLeastOneField<QuerySelectionType<K>>,
          name?: string,
        ]
      : [
          input: ProvidedRequiredAsOptional<QueryInputByKey<K>, I>,
          selection: AtLeastOneField<QuerySelectionType<K>>,
          name?: string,
        ]
  : keyof I extends never
    ? [
        input: QueryInputByKey<K>,
        selection?: QuerySelectionType<K> | undefined,
        name?: string,
      ]
    : Exclude<RequiredKeys<QueryInputByKey<K>>, keyof I> extends never
      ? [
          // input?: ProvidedRequiredAsOptional<QueryInputByKey<K>, I>,
          input?: Partial<QueryInputByKey<K>>,
          selection?: QuerySelectionType<K>,
          name?: string,
        ]
      : [
          input: ProvidedRequiredAsOptional<QueryInputByKey<K>, I>,
          selection?: QuerySelectionType<K> | undefined,
          name?: string,
        ];

async function runQueryOnClient<
  K extends keyof QueryGenqlSelection & keyof Query,
  S extends
    | Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">
    | undefined,
  const I extends Partial<QueryInputByKey<K>> | undefined,
>(
  client: Client,
  q: K,
  defaultSelection:
    | (S & Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">)
    | undefined,
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
    S extends
      | Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">
      | undefined = undefined,
    const I extends Partial<QueryInputByKey<K>> | undefined = undefined,
  >(
    q: K,
    defaultSelection?: S &
      Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">,
    defaultInput?: I,
  ) {
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
  S extends
    | Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">
    | undefined = undefined,
  const I extends Partial<QueryInputByKey<K>> | undefined = undefined,
>(
  client: Client,
  q: K,
  defaultSelection?: S &
    Omit<Exclude<QueryGenqlSelection[K], undefined>, "__args">,
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
