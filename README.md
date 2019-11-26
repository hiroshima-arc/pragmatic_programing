[![Actions Status](https://github.com/hiroshima-arc/pragmatic_programing/workflows/NodeCI/badge.svg)](https://github.com/hiroshima-arc/pragmatic_programing/actions)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6d8012c01d9549b397a9158fe184caeb)](https://www.codacy.com/manual/kakimomokuri/pragmatic_programing?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hiroshima-arc/pragmatic_programing&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6d8012c01d9549b397a9158fe184caeb)](https://www.codacy.com/manual/kakimomokuri/pragmatic_programing?utm_source=github.com&utm_medium=referral&utm_content=hiroshima-arc/pragmatic_programing&utm_campaign=Badge_Coverage)

# アプリケーションプログラマのための練習プログラム集

## 概要

### 目的

### 前提

| ソフトウェア | バージョン | 備考 |
| :----------- | :--------- | :--- |
| nodejs       | 10.16.3    |      |

## 構成

- [構築](#構築)
- [配置](#配置)
- [運用](#運用)
- [開発](#開発)

## 詳細

### 構築

#### 開発パッケージのセットアップ

```bash
npm init -y
npm install --save-dev npm-run-all watch foreman cpx rimraf markdown-to-html @marp-team/marp-cli
npm install --save-dev prettier eslint jshint cross-env codacy-coverage mocha-lcov-reporter
npm install --save-dev browser-sync connect-browser-sync nodemon now
npx browser-sync init
touch Procfile
```

#### アプリケーションのセットアップ

```bash
npm install --save-dev mocha chai cypress fake-indexeddb
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register @babel/polyfill babel-plugin-istanbul cross-env nyc webpack webpack-cli webpack-dev-server babel-loader css-loader html-webpack-plugin mini-css-extract-plugin html-loader copy-webpack-plugin
```

**[⬆ back to top](#構成)**

### 配置

```bash
npx now login
npm run deploy
```

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/hiroshima-arc/pragmatic_programing)

**[⬆ back to top](#構成)**

### 運用

**[⬆ back to top](#構成)**

### 開発

#### アプリケーション

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hiroshima-arc/pragmatic_programing)

```bash
npm install
npm start
```

#### ドキュメント

```bash
npm run docs:start
```

#### スライド

```bash
npm run docs:slide:start
```

**[⬆ back to top](#構成)**

## 参照

- [FizzBuzz](http://www.hiroshima-arc.org/pragmatic_programing/spec/fizz_buzz.html)

