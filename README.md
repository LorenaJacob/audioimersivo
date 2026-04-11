# Audioimersivo

Projeto de audiobook infantil imersivo e interativo, construido em HTML, CSS e JavaScript puro.

A proposta e servir como uma base reutilizavel para livros digitais com audio, mantendo uma camada global compartilhada e uma camada individual por livro.

## O Que O Projeto Faz

- Exibe uma pagina inicial do livro.
- Organiza paginas de leitura com player de audio.
- Usa waveform com Wavesurfer.js.
- Controla play, pause, tempo atual e duracao.
- Faz navegacao entre paginas por configuracao.
- Mantem cabecalho, menu mobile e rodape compartilhados.
- Permite que cada livro tenha seus proprios assets, audios, fontes, cores e textos.

## Tecnologias

- HTML5
- CSS3 responsivo
- JavaScript Vanilla
- Wavesurfer.js
- Configuracao por JSON
- Servidor estatico para desenvolvimento local

## Estrutura Geral

```text
public/
  assets/
    css/
    js/
    img/
  o-dia-que-meu-dedo-decidiu-falar/
    index.html
    config.json
    styles.css
    img/
    audios/
    fonts/
    pages/
```

## Camada Global

A pasta `public/assets/` contem arquivos compartilhados entre livros:

- estilos globais;
- estilos de home, paginas de audio e pagina final;
- scripts globais;
- player universal;
- icones e logos compartilhados.

## Camada Por Livro

Cada livro deve ter sua propria pasta dentro de `public/`.

Dentro dela ficam os arquivos que podem variar:

- `config.json`;
- `styles.css`;
- imagens;
- audios;
- fontes especificas;
- paginas HTML do livro.

## Livro Atual

O livro atual fica em:

```text
public/o-dia-que-meu-dedo-decidiu-falar/
```

As paginas oficiais ficam em:

```text
public/o-dia-que-meu-dedo-decidiu-falar/pages/
```

## Como Rodar Localmente

Na raiz do projeto:

```powershell
python -m http.server 8000
```

Depois abra:

```text
http://127.0.0.1:8000/public/o-dia-que-meu-dedo-decidiu-falar/index.html
```

## Como Criar Novos Livros

Use a estrutura do livro atual como base:

- copie a pasta do livro;
- troque `config.json`;
- troque imagens em `img/`;
- troque audios em `audios/`;
- troque fontes em `fonts/`, se o livro tiver fonte propria;
- use `styles.css` para ajustes especificos do livro;
- evite alterar `public/assets/` quando a mudanca for especifica de um livro.

## Regras De Escalabilidade

- `public/assets/` e compartilhado por todos os livros.
- Cada livro deve isolar seus proprios assets.
- O fluxo de paginas e audios deve vir do `config.json`.
- A estrutura oficial das paginas deve ficar em `pages/`.
- Arquivos antigos ou experimentais nao devem ser usados como modelo para novos livros.

## Projeto Online

```text
https://audioimersivo.lorenajacob.com.br/o-dia-que-meu-dedo-decidiu-falar/
```
