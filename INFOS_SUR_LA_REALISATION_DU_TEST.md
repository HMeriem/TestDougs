# Parti pris

- Je suis partie du principe que nous n'avions qu'une seule balance par periode, qui commence au premier jour du mois et se termine au dernier. De plus, les données de cette dernière doivent être verifier.

- En ce qui concerne les mouvements, je ne considére pas les ids comme des données fiables.

- Pour plus de simplicité, je ne verifie la validité des données que dans le cas d'une balance et de mouvements n'ayant pas le même montant. 

# Aide aux tests

- Pour tester mon code j'ai utilisé les requêtes présentes dans le dossier assets.

# TU

- Je n'ai réalisé qu'un seul TU pour verifier qu'une fonction soit bien appelé lors de l'appel de la fonction validate. Dans un autre contexte toutes les fonction devraient être tester individuellement. Leur retour, le nombre de fois où elles sont appelées et avec quelle données elle le sont. 

# Informations complémentaires 

- Les fonctions sont toutes private (sauf pour celle testé). Dans une application plus fournie ces derniéres etant possiblement réutilisable public pourrait être plus adapté.

- Enfin la presentation des raisons du tea pot. Un autre agencement des données serait plus adapté, afin de trier les données plus facilement, dans le cas où nous souhaiterions les presenter dans une IHM dédiée aux comptables. 