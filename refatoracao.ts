export {};
class Consumidor {
    private nome: string;
    private idade: number;
    private email: string;

    constructor(nome: string, idade: number, email: string) {
        if (nome.trim() === "") {
            throw new Error("O nome não pode estar vazio.");
        }

        if (!Number.isInteger(idade) || idade < 0) {
            throw new Error("Idade inválida.");
        }

        if (!email.includes("@")) {
            throw new Error("E-mail inválido.");
        }

        this.nome = nome.trim();
        this.idade = idade;
        this.email = email.trim();
    }

    getNome(): string {
        return this.nome;
    }

    getIdade(): number {
        return this.idade;
    }

    getEmail(): string {
        return this.email;
    }

    formatarExibicao(): string {
        return `Consumidor: ${this.nome} (${this.idade} anos) - ${this.email}`;
    }
}

// CLASSE RESPONSÁVEL PELO CADASTRO
class CadastroConsumidores {
    private consumidores: Consumidor[] = [];

    adicionarConsumidor(consumidor: Consumidor): void {
        this.consumidores.push(consumidor);
    }

    listarConsumidores(): void {
        this.consumidores.forEach((consumidor) => {
            console.log(consumidor.formatarExibicao());
        });
    }

    // CALCULAR MÉDIA DE IDADE
    calcularMediaIdade(): number {
        if (this.consumidores.length === 0) {
            return 0;
        }

        const soma = this.consumidores.reduce(
            (total, consumidor) => total + consumidor.getIdade(),
            0
        );

        return soma / this.consumidores.length;
    }

    // IDENTIFICAR MAIS VELHO E MAIS NOVO
    obterExtremosIdade(): {
        maisVelho: Consumidor | undefined;
        maisNovo: Consumidor | undefined;
    } {
        if (this.consumidores.length === 0) {
            return {
                maisVelho: undefined,
                maisNovo: undefined
            };
        }

        let maisVelho = this.consumidores[0];
        let maisNovo = this.consumidores[0];

        for (const consumidor of this.consumidores) {
            if (consumidor.getIdade() > maisVelho.getIdade()) {
                maisVelho = consumidor;
            }

            if (consumidor.getIdade() < maisNovo.getIdade()) {
                maisNovo = consumidor;
            }
        }

        return { maisVelho, maisNovo };
    }
}

// EXECUÇÃO DE TESTE
const cadastro = new CadastroConsumidores();

cadastro.adicionarConsumidor(
    new Consumidor("Ana Silva", 30, "ana@email.com")
);

cadastro.adicionarConsumidor(
    new Consumidor("Carlos Souza", 22, "carlos@email.com")
);

cadastro.adicionarConsumidor(
    new Consumidor("Mariana Lima", 45, "mariana@email.com")
);

cadastro.adicionarConsumidor(
    new Consumidor("Roberto Alves", 19, "roberto@email.com")
);

cadastro.adicionarConsumidor(
    new Consumidor("Fernanda Dias", 33, "fernanda@email.com")
);

// EXIBIR CONSUMIDORES
console.log("=== LISTA DE CONSUMIDORES ===");
cadastro.listarConsumidores();

// EXIBIR ESTATÍSTICAS
console.log("\n=== ANÁLISE ESTATÍSTICA ===");

console.log(
    `Média das Idades: ${cadastro.calcularMediaIdade().toFixed(1)} anos`
);

const { maisVelho, maisNovo } = cadastro.obterExtremosIdade();

if (maisVelho !== undefined && maisNovo !== undefined) {
    console.log(
        `Mais Velho(a): ${maisVelho.getNome()} (${maisVelho.getIdade()} anos)`
    );

    console.log(
        `Mais Novo(a): ${maisNovo.getNome()} (${maisNovo.getIdade()} anos)`
    );
} else {
    console.log("Não foi possível calcular os extremos de idade.");
}
