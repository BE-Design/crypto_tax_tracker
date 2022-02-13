import client from '../client';

const ENDPOINT = "/transactions";

class TransactionService {
  static async all(sortDirection = 'desc') {
    return await client.get(`${ENDPOINT}?sort=${sortDirection}`);
  }

  static async update(id, data) {
    return await client.put(`${ENDPOINT}/${id}`, data);
  }

  static async create(data) {
    return await client.post(ENDPOINT, data);
  }
}

export default TransactionService;
