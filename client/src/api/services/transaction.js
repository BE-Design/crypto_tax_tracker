import client from '../client';

/**
 * Base endpoint for transaction CRUD operations.
 *
 * @type {string}
 */
const ENDPOINT = "/transactions";

class TransactionService {

  /**
   * Retrieve all transactions from the server.
   * 
   * @param {string} sortDirection
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async all(sortDirection = 'desc') {
    return await client.get(`${ENDPOINT}?sort=${sortDirection}`);
  }

  /**
   * Update a transaction on the server.
   *
   * @param {int} id
   * @param {object} data
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async update(id, data) {
    return await client.put(`${ENDPOINT}/${id}`, data);
  }

  /**
   * Persist a new transaction on the server.
   *
   * @param {object} data
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async create(data) {
    return await client.post(ENDPOINT, data);
  }

  /**
   * Delete a transaction from the server.
   *
   * @param {int} id
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async delete(id) {
      return await client.delete(`${ENDPOINT}/${id}`);
    }
}

export default TransactionService;
