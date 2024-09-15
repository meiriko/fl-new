import { ChangeEvent, ChangeEventHandler } from "react";

export function toFieldSetter<T extends object, F extends keyof T>(
  reducerFN: React.Dispatch<React.SetStateAction<T>>,
  field: F
) {
  return (value: T[F]) => {
    reducerFN((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
}

type TypedKeys<T, KT> = keyof {
  [K in keyof T as T[K] extends KT ? K : never]: T[K];
};

// type StrKeys<T> = keyof {
//   [K in keyof T as T[K] extends string ? K : never]: T[K];
// };

export function toInputFieldSetter<
  T extends object,
  F extends TypedKeys<T, string>,
  TF extends TypedKeys<T, boolean>,
>(
  reducerFN: React.Dispatch<React.SetStateAction<T>>,
  field: F,
  invalidTypeField: TF
): ChangeEventHandler<HTMLInputElement>;

export function toInputFieldSetter<
  T extends object,
  F extends TypedKeys<T, string>,
>(
  reducerFN: React.Dispatch<React.SetStateAction<T>>,
  field: F
): ChangeEventHandler<HTMLInputElement>;

export function toInputFieldSetter<
  T extends object,
  F extends TypedKeys<T, string>,
  TF extends TypedKeys<T, boolean>,
>(
  reducerFN: React.Dispatch<React.SetStateAction<T>>,
  field: F,
  invalidTypeField?: TF
): ChangeEventHandler<HTMLInputElement> {
  return ({
    target: {
      value,
      validity: { typeMismatch },
    },
  }: ChangeEvent<HTMLInputElement>) => {
    const update = invalidTypeField
      ? {
          [invalidTypeField]: typeMismatch,
          [field]: value,
        }
      : {
          [field]: value,
        };
    reducerFN((prev) => ({
      ...prev,
      ...update,
    }));
  };
}
