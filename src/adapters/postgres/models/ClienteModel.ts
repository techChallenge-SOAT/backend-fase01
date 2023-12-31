import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/sequelize';

export class Cliente extends Model {
  #id!: string;
  #cpf!: string;
  #nome!: string;
  #email!: string;
  #senha!: string;

  get id(): string {
    return this.#id;
  }
  set id(value: string) {
    this.#id = value;
  }

  get cpf(): string {
    return this.#cpf;
  }
  set cpf(value: string) {
    this.#cpf = value;
  }

  get nome(): string {
    return this.#nome;
  }
  set nome(value: string) {
    this.#nome = value;
  }

  get email(): string {
    return this.#email;
  }
  set email(value: string) {
    this.#email = value;
  }

  get senha(): string {
    return this.#senha;
  }
  set senha(value: string) {
    this.#senha = value;
  }
}

Cliente.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false,
  },
);
