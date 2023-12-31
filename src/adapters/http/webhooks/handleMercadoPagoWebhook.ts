import express, { Request, Response } from 'express';
import { AlterarStatusDoPedidoUseCase } from '../../../application/useCases/pedido/AlterarStatusDoPedidoUseCase';
import { Status } from '../../../application/valueObjects/Pedido';

export const handleMercadoPagoWebhook = async (req: Request, res: Response) => {
  try {
    const { id_pedido, status } = req.body;

    if (!id_pedido || !status) {
      return res.status(400).send('Pedido ou status ausente');
    }
    
    if (status.trim().toLowerCase() === 'pago' ) {
      await AlterarStatusDoPedidoUseCase.execute(id_pedido, Status.Pago);
      return res.status(200).send('Status do pedido atualizado para "pago"');
    } else if (status.trim().toLowerCase() === 'cancelado') {
      await AlterarStatusDoPedidoUseCase.execute(id_pedido, Status.Cancelado);
      return res.status(200).send('Status do pedido atualizado para "cancelado"');
    } else {
      return res.status(400).send('Status inválido recebido');
    }
  } catch (error) {
    console.error('Erro ao processar webhook do MercadoPago:', error);
    return res.status(500).send('Erro interno ao processar o webhook');
  }
};
