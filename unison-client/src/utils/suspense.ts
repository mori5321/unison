type LoadableState<T> =
  | {
      status: 'pending'
      promise: Promise<T>
    }
  | {
      status: 'fulfilled'
      data: T
    }
  | {
      status: 'rejected'
      error: unknown
    }

export type Resource<T> = {
  readonly read: () => T
}

export const Loadable = <T>(promise: Promise<T>): Resource<T> => {
  let state: LoadableState<T> = {
    status: 'pending',
    promise: promise.then(
      (data) => {
        state = {
          status: 'fulfilled',
          data
        }
        return data
      },
      (error) => {
        state = {
          status: 'rejected',
          error
        }
        throw error
      }
    )
  }

  const read = (): T => {
    switch (state.status) {
    case 'pending':
      throw state.promise
    case 'fulfilled':
      return state.data
    case 'rejected':
      throw state.error
    }
  }

  return { read }
}

