## cypress-basico-v2

## Pré-requisitos

Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

- [git](https://git-scm.com/) (estou usando a versão `2.43.1`)
- [Node.js](https://nodejs.org/en/) (estou usando a versão `v21.2.0` enquanto escrevo esta aula)
- npm (estou usando a versão `10.2.3`)
- [Google Chrome](https://www.google.com/intl/pt_br/chrome/) (estou usando a versão `Versão 119.0.6045.199 (Versão oficial) 64 bits` enquanto escrevo esta aula)
- [Visual Studio Code](https://code.visualstudio.com/) (estou usando a versão `1.84.2`) ou alguma outra IDE de sua preferência

> **Obs.:** Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas listados acima.

> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉

> **Obs. 3:** Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando `git --version,  node --version, npm --version` no seu terminal de linha de comando um por vez.

> **Obs. 4:** Deixei links para os instaladores na lista de requisitos acima, caso não os tenha instalados ainda.
___

Legal, os pre-requisitos estão prontos. ☑️

## Instalation
Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests
You can run the tests simulating a desktop or mobile viewport.

## Desktop
Run `npm test` (or `npm t` for the short version) top run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive  mode on a desktop viewport.

## Mobile
Run `npm test:mobile` to run the test in headless mode on mobile viewport.

Or, run `npm run cy:open:mobile` to open Cypress in interactive  mode on mobile viewport.

_____

This project was created with 💛 by [Augusto Oliveira]