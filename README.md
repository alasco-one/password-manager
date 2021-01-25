# password-manager
Une extension google-chrome basée sur **Vue.js** permettant de gerer les mots de passe en fonction des noms de domaines avec plusieurs couches de sécurité.


## Configuration du projet
```
npm install
```

### Compilation
```
npm run build
```
### Chargément dans google chrome
- Activer le mode Dévéloppeur dans l'onglet Extension du ménu de configuration de google.
- Charger l'extension non empaquetée.
- Selectionner le dossier **dist** généré à la suite de la compilation.
- Lancer l'extension

### Démonstration
Voici la page de connexion de l'extension google chrome : 

![Image de la page de connexion](/images/connexion.png)

Une fois qu’on s’y connecte, la page password est affiché et ainsi on peut gérer le mot de passe en lien avec le nom de domaine.

![Image de la page de gestion de mot de passe](/images/creating.png)

Et ensuite lorsque le mot de passe est utilisé au-delà d’un temps donné, un message est affiché à l’utilisateur pour l’informer et suggérer de le changer. 

![Image de la page de changement de mot de passe](/images/changing.png)

Et lorsqu’il clique sur valider, le nouveau mot de passe est aussitôt pris comme le mot de passe courant de l’utilisateur et ainsi le changement s’effectue avec la disparition du message de notification. 

![Image de la page du nouveau de mot de passe](/images/changed.png)


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
