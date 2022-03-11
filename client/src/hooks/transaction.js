import TransactionService from "../api/services/transaction";
import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 * @type {string}
 */
const TRANSACTIONS_CACHE_KEY = 'transactions';

/**
 * Retrieve all transactions.
 *
 * @param {object} params
 * @param {object} options
 * @returns UseQueryResult
 */
export const useGetTransactions = (params = {}, options = {}) => {
  return useQuery([TRANSACTIONS_CACHE_KEY, JSON.stringify(params)], () => TransactionService.all(params), {
    initialData: [],
    ...options
  });
};

/**
 * Create a transaction.
 *
 * @param {object} transaction
 * @param {object} options
 * @returns UseMutationResult
 */
export const useCreateTransaction = (transaction, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(() => TransactionService.create(transaction), {
    ...options,
    onSuccess: () => {
      // always invalidate the cache for refresh on success.
      queryClient.invalidateQueries(TRANSACTIONS_CACHE_KEY);

      // if a custom success callback was given, also call that bad boy.
      if (typeof options.onSuccess === 'function') {
        options.onSuccess();
      }
    }
  });
};

/**
 * Update a transaction.
 *
 * @param {int} id
 * @param {object} data
 * @param {object} options
 * @returns UseMutationResult
 */
export const useUpdateTransaction = (id, data, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(() => TransactionService.update(id, data), {
    ...options,
    onSuccess: () => {
      // always invalidate the cache for refresh on success.
      queryClient.invalidateQueries(TRANSACTIONS_CACHE_KEY);

      // if a custom success callback was given, also call that bad boy.
      if (typeof options.onSuccess === 'function') {
        options.onSuccess();
      }
    }
  })
};

/**
 * Delete a transaction.
 *
 * @param {int} id
 * @param {object} options
 * @returns UseMutationResult
 */
export const useDeleteTransaction = (id, options ={}) => {
  const queryClient = useQueryClient();

  return useMutation(() => TransactionService.delete(id), {
    ...options,
    onSuccess: () => {
      // always invalidate the cache for refresh on success.
      queryClient.invalidateQueries(TRANSACTIONS_CACHE_KEY);

      if (typeof options.onSuccess === 'function') {
        options.onSuccess();
      }
    }
  });
};
