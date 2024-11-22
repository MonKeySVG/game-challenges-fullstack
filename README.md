# Project Name

## Description

Ce projet est une application web qui permet de gérer des jeux et des défis associés. Les utilisateurs peuvent ajouter des défis et des soumissions pour chaque jeu. Le projet utilise un backend en Python et un frontend en Angular.

## Prérequis

- Docker
- Docker Compose
- Node.js
- npm

## Installation

### Backend

1. Clonez le dépôt du projet :
    ```bash
    git clone <URL_DU_DEPOT>
    cd <NOM_DU_DEPOT>
    ```

2. Lancez Docker Compose pour démarrer le backend :
    ```bash
    docker-compose up
    ```

### Frontend

1. Accédez au répertoire du frontend :
    ```bash
    cd api/app/frontend
    ```

2. Installez les dépendances npm :
    ```bash
    npm install
    ```

3. Démarrez le serveur Angular :
    ```bash
    ng serve
    ```

## Utilisation

1. Accédez à l'application web via votre navigateur à l'adresse suivante :
    ```
    http://localhost:4200
    ```

2. Vous pouvez maintenant ajouter des jeux, des défis et des soumissions via l'interface utilisateur.

## Structure du Projet

- `api/`: Contient le code backend en Python.
- `api/app/frontend/`: Contient le code frontend en Angular.

