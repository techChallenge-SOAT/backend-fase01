import Item from '../../../application/valueObjects/Item';
import { Item as ItemModel } from '../models/PedidoItemModels';

export class ItemRepository {
  static async criar(item: Item) {
    return await ItemModel.create({
      id: item.id,
      categoria: item.categoria,
      nome: item.nome,
      descricao: item.descricao,
      preco_unitario: item.preco_unitario,
    });
  }

  static async buscarPorId(id: string) {
    return ItemModel.findByPk(id);
  }

  static async buscarPorNome(nome: string) {
    return ItemModel.findOne({ where: { nome: nome}})
  }

  static async buscarTodos() {
    return ItemModel.findAll({
      order: [['nome', 'ASC']],
    });
  }
}
