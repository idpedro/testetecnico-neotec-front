# Teste Técnico Frontend - NeoTech

Desafio técnico com a proposta de desenvolver uma aplicação frontend como uso do react para consumir uma api restfull e criar interações dinamicas com fluxo e responsividade.

## Dependências

| Lib  | Descrição de sua utilidade                                   |
| ---- | :----------------------------------------------------------- |
| next | Facilita as configuração de politica de troca de requisição entre dominios |
| sass | Facilita o desenvolvimento frontend css ,além de melhorar a distribuição das estilizações. |

## Dependências de Desenvolvimento

| Lib         | Descrição de sua utilidade                                   |
| :---------- | ------------------------------------------------------------ |
| typescript~ | Superset do javascript, auxilia na tipagem de dados e nas boas praticas de codificação. |

### Requisitos

- [x] Evite utilizar muitas bibliotecas que não sejam diretamente relacionadas ao build da aplicação (babel, webpack, gulp, etc).
- [x] Obrigatorio o uso de React.js.
- [x] Usar a fonte [Source Sans Pro]([https://www.google.com/fonts#UsePlace:use/Collection:Source+Sans+Pro](https://t.lever-analytics.com/email-link?dest=https%3A%2F%2Fwww.google.com%2Ffonts%23UsePlace%3Ause%2FCollection%3ASource%2BSans%2BPro&eid=195a8985-e5eb-4f4f-8870-3dd6f5511e47&idx=4&token=ZKOKRgWg4ovmRo4HPPs8naOVeME))
- [x] Faça as páginas terem comportamento responsivo.
- [x] Reproduzir a interface que está na pasta /design do projeto, de acordo com os fluxos e interações propostos
- [x]  consumir **API JSON RESTful**  criada no projeto anterior

#### Extras

- [ ] Testes de unidade
- [x] Utilização de linters ou outras ferramentas de análise estática
- [x] Docker

#### Resultado



![image-20220119130448649](/home/viceroy/.config/Typora/typora-user-images/image-20220119130448649.png)

![image-20220119130504318](/home/viceroy/.config/Typora/typora-user-images/image-20220119130504318.png)

![image-20220119130525112](/home/viceroy/.config/Typora/typora-user-images/image-20220119130525112.png)



### Executando o Projeto

> Na raiz do projeto contém uma arquivo Dockerfile, nesse tem as receita para a construção da imagen do projeto.

```bash
## Build da imagems
## Executar na raiz do projeto
docker build  -t neotech-back:1.0.0 .
docker build -t idpedroferreira/neotech-front:1.0.0 .
```

#### Executando via fontes

```bash
# instanciar um container mysql
docker run --name   backend -p 3333:3333  -d neotech-back:1.0.0
# instalar as dependências de produção do projeto
npm ci
npm build
npm start

```

#### **Variável** de ambiente da API image

| Variável     | Descrição                       | Valor Padrão |
| ------------ | ------------------------------- | ------------ |
| API_HOSTNAME | hostname da api                 | *localhost*  |
| API_PORT     | Porta da api                    | 3333         |
| PORT         | Porta que ouvira as requisições | 3000         |
