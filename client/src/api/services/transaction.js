import client from '../client';

const ENDPOINT = "/transactions";

class TransactionService {
  static async all() {
    return await client.get(ENDPOINT);
  }

  static async update(id, data) {
    return await client.put(`${ENDPOINT}/${id}`, data);
  }
}

export default TransactionService;
