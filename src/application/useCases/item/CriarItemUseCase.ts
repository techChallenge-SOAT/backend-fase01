import Item from '../../valueObjects/Item';
import { ItemRepository } from '../../../adapters/postgres/item/ItemRepository';

export class CriarItemUseCase {
  static async nomeExiste(nome:string) {
    const nomeExistente = await ItemRepository.buscarPorNome(nome.trim());
    return nomeExistente !== null;
  }

  static async execute(
    categoria: string,
    nome: string,
    descricao: string,
    preco_unitario: number,
    ) {
      try {
        const nomeJaExiste = await this.nomeExiste(nome);

        if(nomeJaExiste) {
          throw new Error('Nome de item já cadastrado');
        }

        const item = new Item(
          categoria,
          nome,
          descricao,
          preco_unitario,
        )
        return ItemRepository.criar(item);
      } catch (error) {
        throw error;
      }
  }
}
