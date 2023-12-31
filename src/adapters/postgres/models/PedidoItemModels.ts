import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import sequelize from '../../../config/sequelize';

class Pedido extends Model {
  #id!: string;
  #cliente_cpf!: string;
  #data_pedido?: Date;
  #status!: string;
  public itens?: Item[];

  get id(): string {
    return this.#id;
  }
  set id(value: string) {
    this.#id = value;
  }

  get cliente_cpf(): string {
    return this.#cliente_cpf;
  }
  set cliente_cpf(value: string) {
    this.#cliente_cpf = value;
  }

  get data_pedido(): Date | undefined {
    return this.#data_pedido;
  }
  set data_pedido(value: Date | undefined) {
    this.#data_pedido = value;
  }

  get status(): string {
    return this.#status;
  }
  set status(value: string) {
    this.#status = value;
  }

  declare buscaItens: BelongsToManyGetAssociationsMixin<Item>;

  declare addItem: BelongsToManyAddAssociationMixin<Item, number>;

  declare addItens: BelongsToManyAddAssociationsMixin<Item, number>;

  declare setItem: BelongsToManySetAssociationsMixin<Item, number>;

  declare createItem: BelongsToManyCreateAssociationMixin<Item>;

  public static associate(models: any) {
    Pedido.belongsToMany(models.Item, { through: models.PedidoItem, foreignKey: 'pedido_id', otherKey: 'item_id' });
  }
}

Pedido.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cliente_cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'recebido',
        'pago',
        'em preparação',
        'cancelado',
        'pronto',
        'finalizado'
      ),
      allowNull: false,
      defaultValue: 'recebido',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'data_pedido',
    },
  },
  {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  }
);

class PedidoItem extends Model {
  #pedido_id!: string;
  #item_id!: string;
  #quantidade!: number;

  get pedido_id(): string {
    return this.#pedido_id;
  }
  set pedido_id(value: string) {
    this.#pedido_id = value;
  }

  get item_id(): string {
    return this.#item_id;
  }
  set item_id(value: string) {
    this.#item_id = value;
  }
  
  get quantidade(): number {
    return this.#quantidade;
  }
  set quantidade(value: number) {
    this.#quantidade = value;
  }

  public static associate(models: any) {
    PedidoItem.belongsTo(models.Item, { foreignKey: 'item_id' });
    PedidoItem.belongsTo(models.Pedido, { foreignKey: 'pedido_id' });
  }
}

PedidoItem.init(
  {
    pedido_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PedidoItem',
    tableName: 'pedidos_itens',
    timestamps: false,
  },
);

class Item extends Model {
  #id!: string;
  #categoria!: string;
  #nome!: string;
  #descricao!: string;
  #preco_unitario!: number;

  get id(): string {
    return this.#id;
  }
  set id(value: string) {
    this.#id = value;
  }

  get categoria(): string {
    return this.#categoria;
  }
  set categoria(value: string) {
    this.#categoria = value;
  }

  get nome(): string {
    return this.#nome;
  }
  set nome(value: string) {
    this.#nome = value;
  }

  get descricao(): string {
    return this.#descricao;
  }
  set descricao(value: string) {
    this.#descricao = value;
  }

  get preco_unitario(): number {
    return this.#preco_unitario;
  }
  set preco_unitario(value: number) {
    this.#preco_unitario = value;
  }

  declare buscaPedidos: BelongsToManyGetAssociationsMixin<Pedido>;
  declare addPedido: BelongsToManyAddAssociationMixin<Pedido, number>;
  declare addPedidos: BelongsToManyAddAssociationsMixin<Pedido, number>;
  declare setPedido: BelongsToManySetAssociationsMixin<Pedido, number>;
  declare createPedido: BelongsToManyCreateAssociationMixin<Pedido>;

  public static associate(models: any) {
    Item.belongsToMany(models.Pedido, { through: models.PedidoItem, foreignKey: 'item_id' });
  }
}

Item.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Item',
    tableName: 'itens',
    timestamps: false,
  },
);

Pedido.belongsToMany(Item, { through: PedidoItem, foreignKey: 'pedido_id', as: 'itens' });
Item.belongsToMany(Pedido, { through: PedidoItem, foreignKey: 'item_id' });

export { Pedido, PedidoItem, Item };
