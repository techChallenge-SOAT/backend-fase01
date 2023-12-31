import Cliente from '../../../application/valueObjects/Cliente';
import { ClienteRepository } from '../../../adapters/postgres/cliente/ClienteRepository';

export class AdicionarClienteUseCase {
  static async cpfExiste(cpf: string) {
    const clienteExistente = await ClienteRepository.buscarClientePorCPF(cpf);
    return clienteExistente !== null;
  }

  static async emailExiste(email: string) {
    const clienteExistente = await ClienteRepository.buscarClientePorEmail(email);
    return clienteExistente !== null;
  }

  static async execute(
    cpf: string,
    nome: string,
    email: string,
    senha: string,
  ) {
    try {
      const cpfJaExiste = await this.cpfExiste(cpf);
      const emailJaExiste = await this.emailExiste(email);

      if (cpfJaExiste) {
        throw new Error('CPF já cadastrado.');
      }

      if (emailJaExiste) {
        throw new Error('Email já cadastrado.');
      }

      
      const cliente = new Cliente(
        cpf,
        nome,
        email,
        senha,
        )

      return ClienteRepository.adicionarCliente(cliente);
    } catch (error) {
      throw error;
    }
  }
}
