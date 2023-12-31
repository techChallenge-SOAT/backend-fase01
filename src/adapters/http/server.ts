import express from 'express';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/clienteRoutes';
import itemRoutes from './routes/itemRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import { handleMercadoPagoWebhook } from './webhooks/handleMercadoPagoWebhook';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from '../../config/swagger.json';

const app = express();

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/clientes', clienteRoutes);

app.use('/itens', itemRoutes);

app.use('/pedidos', pedidoRoutes);

app.use('/webhooks/mercadopago', handleMercadoPagoWebhook);

app.get('/', (req, res) => {
  res.send('Sistema Clientes e Pedidos');
});

export { app };
