import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import { Status } from '../../../application/valueObjects/Pedido';

export class AlterarStatusDoPedidoUseCase {
  static async execute(id_pedido: string, status: Status) {
    const statusAtual = await PedidoRepository.obterStatus(id_pedido);

    if (statusAtual !== Status.Recebido || status !== Status.Pago) {
      throw new Error('Somente status "Recebido" pode ser atualizado para "Pago"');
    }

    if (!(Object.values(Status).includes(status))) {
      throw new Error('Status inválido');
    }
    
    return PedidoRepository.atualizarStatus(id_pedido, status);
  }
}
