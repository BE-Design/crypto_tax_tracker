import client from '../client';

const ENDPOINT = "/transactions";

class TransactionService {
  static async all() {
    return await client.get(ENDPOINT);
  }
}

export default TransactionService;
