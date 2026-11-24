import React, {useState} from "react";

const CivilianCareerCards = ({career, department}) => {
  const [job, setJob] = useState("");
  // const [deployed, setDeployed] = useState(false);
  const [active, setActive] = useState(false);

  let careerName = "";
  let careerDescription = "";
  let imgName = "";
  let careerAdvancement = "";
  let category = "";

  switch (career) {
    // Civilian high ranks
    case "primarque":
      careerName = "primarque";
      imgName = "primarque";
      careerAdvancement = "neant";
      careerDescription =
        "Le Primarque est le dirigeant de la faction Primaris. Ils dirigent les Exécuteurs Civil et Militaire. Cette fonction se transmet soit à la déscendance, soit le successeur est désigné par le titulaire actuel.";

      category = "dirigeant";
      break;
    case "civilian-executioner":
      careerName = "executeur civil";
      imgName = "civilianExecutioner";
      careerAdvancement = "neant";
      careerDescription =
        "L'Exécuteur Civil est le bras droit du Primarque. Il supervise toute la partie civile de la faction Primaris. C'est lui qui rédige, propose et publie les nouvelles directives. Les directeurs de départements et les Polémarques sont directement placés sous sa responsabilité.";

      category = "dirigeant adjoint";
      break;
    case "treasurer":
      careerName = "tresorier";
      imgName = "treasurer";
      careerAdvancement = "neant";
      careerDescription =
        "Le trésorier civil est en charge de comptabiliser toutes les richesses pécunières de la partie civile de la faction Primaris. Pour l'aider dans cette tâche, la banque centrale Primaris qu'il dirige lui apporte son concours.";

      category = "banquier / comptable";
      break;
    case "polemarch":
      careerName = "polémarque";
      imgName = "polemarque";
      careerAdvancement = "neant";
      careerDescription =
        "Les Polémarques sont directements rattachés à l'Executeur Civil. Leurs rôles peuvent être variés. En règle générale, ce sont eux qui se déplacent pour diverses supervisions lorsque l'Executeur n'est pas en mesure de le faire lui-même. Nous pourrions les considérer comme les yeux, les oreilles et la bouche de l'Exécuteur Civil. Ils représentent son autorité, et indirectement, l'autorité du Primarque. Certains peuvent se spécialiser dans certains domaines afin d'être capables de gérer diverses situation comme par exemple prendre en main une mission d'exploration particulière.";

      category = "representant officiel";
      break;
    //-----------------------------

    // Primaris Academy
    case "academy-director":
      careerName = "directeur d'Académie";
      imgName = "academyDirector";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur de l'Académie Primaris est seul à ce poste. 
      Il supervise l'académie d'une manière générale. Conseiller de l'Executeur Civil en matière de formation et de pédagogie, il propose de nouvelles solutions pour améliorer la qualité de l'accueil et la qualité des formations dispensées aux nouveaux arrivant, ainsi qu'aux Primaris confirmés.`;

      category = "responsable";
      break;
    case "chief-former":
      careerName = "chef d'équipe";
      imgName = "academyTeamChief";
      careerAdvancement = "directeur d'Académie";
      careerDescription = `Les chefs d'équipe de formation gèrent les projets pour lesquels ils ont été désignés ou qu'ils ont choisi d'élaborer. Responsables de plusieurs formateurs, ils centralisent et font remonter au directeur les informations et les réalisations de l'équipe.`;

      category = "formation";
      break;
    case "former":
      careerName = "formateur";
      imgName = "academyTeacher";
      careerAdvancement = "chef d'équipe";
      careerDescription = `Les formateurs font parties et sont membres de l'Académie
      Primaris. Ils réalisent et dispensent les diverses formations aux
      Primaris. Pédagogues, compréhensifs et disponibles, ils
      n'hésiteront pas à répondre à toutes vos intérrogations. Ils se chargeront également de vous accueillir comme il se doit à votre arrivée parmi nous.`;

      category = "formation";
      break;
    case "intern":
      careerName = "stagiaire";
      imgName = "academyIntern";
      careerAdvancement = "diverses";
      careerDescription = `Les stagiaires sont des Primaris qui sont soit en phase d'intégration, soit déjà confirmés. Ces personnels sont ainsi dans l'Académie afin de recevoir un enseignement quelconque. Que ce soit dans le but d'apprendre un nouveau métier. Que ce soit dans le but de se perfectionner dans une profession déjà éxercée ou bien pour augmenter une compétence particulière, tous les Primaris peuvent effectuer une demande auprès de leur département de rattachement afin d'entrer à l'académie Primaris en tant que stagiaire. `;

      category = "formation";
      break;
    //-----------------------------

    // Department of exploration
    case "exploration-director":
      careerName = "directeur exploration";
      imgName = "explorationDirector";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur du département de l'exploration dirige le département dans son intégralité. Il oriente et définit les objectifs d'une manière générale pour tous les explorateurs via les chefs de secteurs.`;

      category = "responsable";
      break;
    case "exploration-sector-chief":
      careerName = "chef de secteur";
      imgName = "explorationSectorChief";
      careerAdvancement = "directeur exploration";
      careerDescription = `Les chefs de secteurs ont la lourde responsabilité de coordonner toutes les flottes d'exploration affectées à leur secteur. Cela en prenant en compte chaque découverte geographique et scientifique faite lors des expéditions.`;

      category = "responsable";
      break;
    case "chief-explorer":
      careerName = "pionnier";
      imgName = "explorationExplorerChief";
      careerAdvancement = "chef de secteur";
      careerDescription = `Les pionniers sont placés directement sous la responsabilité du Directeur du département de l'exploration. La plupart du temps, un pionnier est chargé d'explorer un secteur en particulier. Il est chef d'expédition et il a sous ses ordres une flotte d'exploration composée de plusieurs vaisseaux multicrew. Ces expéditions sont souvent très couteuses et sont organisées lorsque le jeu en vaut la chandelle.`;

      category = "explorateur / gestionnaire";
      break;
    case "explorer":
      careerName = "explorateur confirmé";
      imgName = "explorationExplorer";
      careerAdvancement = "pionnier";
      careerDescription = `Les explorateurs confirmés sont des personnels qui ont déjà effectués plusieurs expéditions sans encombre. Ils sont experts dans l'organisation de leur voyage vers l'inconnu.`;

      category = "explorateur";
      break;
    case "explorer-apprentice":
      careerName = "apprentit explorateur";
      imgName = "explorationExplorerApprentice";
      careerAdvancement = "explorateur confirmé";
      careerDescription = `Les apprentits explorateurs sont pour la plupart du temps les nouvelles recrues fraichement sorties de l'académie Primaris. Ils n'ont peu voire pas d'expérience dans l'exploration et nécessitent d'effectuer des voyages sous les ordres d'explorateurs chevronnés.`;

      category = "explorateur";
      break;
    case "exploration-navigator-chief":
      careerName = "chef navigateur";
      imgName = "explorationNavigatorChief";
      careerAdvancement = "néant";
      careerDescription = `Les pionniers et les explorateurs chevronnés ont pour la plupart du temps au moins un navigateur dans leur vaisseau. On retrouvera un chef navigateur sur un vaisseau d'exploration nécessitant un certain nombre de personnels à bord, mais surtout nécessitant plusieurs navigateurs.`;

      category = "navigateur";
      break;
    case "exploration-navigator":
      careerName = "navigateur";
      imgName = "explorationNavigator";
      careerAdvancement = "chef navigateur";
      careerDescription = `Les navigateurs sont les responsables de l'établissement des routes d'exploration à travers les divers dangers de l'espace. La plupart du temps, ils sont employés à bord des vaisseaux dirigés par un explorateur chevronné ou par un pionnier.`;

      category = "navigateur";
      break;
    case "exploration-navigator-apprentice":
      careerName = "apprentit navigateur";
      imgName = "explorationNavigatorApprentice";
      careerAdvancement = "navigateur";
      careerDescription = `Les apprentits navigateurs viennent de sortir de l'Académie Primaris. Ils doivent faire leurs armes sous la tutelle d'un navigateur expérimenté avant d'espérer devenir responsable d'un tracé de route à travers l'espace à leur tour.`;

      category = "navigateur";
      break;
    case "exploration-ground-vehicule-driver-chief":
      careerName = "chef de convoi au sol";
      imgName = "explorationGroundVehiculeDriverChief";
      careerAdvancement = "néant";
      careerDescription = `Les chefs de convoi dirigent et coordonnent les conducteurs de véhicules terrestres. Ils sont placés directement sous les ordres du chef d'expédition.`;

      category = "conducteur";
      break;
    case "exploration-ground-vehicule-driver":
      careerName = "conducteur expérimenté";
      imgName = "explorationGroundVehiculeDriver";
      careerAdvancement = "chef d'équipe";
      careerDescription = `Les pilotes de véhicules terrestres sont responsables de leur véhicule. Ils ont pour mission d'emmener les explorateurs et autres intervenants d'un point A à un point B, celà en toute sécurité à la surface des planètes et des lunes explorées.`;

      category = "conducteur";
      break;
    case "exploration-ground-vehicule-driver-apprentice":
      careerName = "apprentit conducteur";
      imgName = "explorationGroundVehiculeDriverApprentice";
      careerAdvancement = "conducteur de véhicule expérimenté";
      careerDescription = `Les apprentits conducteurs de véhicules sont fraichement sortis de l'Académie Primaris. Ils devront apprendre la réalité de la conduite sous la tutelle d'autres conducteurs plus expérimentés lors de leurs futures expéditions.`;

      category = "conducteur";
      break;
    //-----------------------------

    // Department of exploration
    case "touring-director":
      careerName = "directeur tourisme";
      imgName = "touringDirector";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur du département du tourisme est le référent et le conseiller de l'Exécuteur Civil en matière de tourisme. il transmet les derniers chiffres et les dernières informations concernant la situation du département. C'est également lui qui valide les nouvelles destinations et les nouveaux parcours découverts par les membres du département.  `;

      category = "responsable";
      break;
    case "touring-sector-chief":
      careerName = "chef de secteur ";
      imgName = "touringSectorChief";
      careerAdvancement = "directeur tourisme";
      careerDescription = `Le chef du secteur touristiques est directement rattaché au directeur du département. Il organise et gère les services touristiques Primaris dans des secteurs nien définis.`;

      category = "responsable";
      break;
    case "touring-fleet-chief":
      careerName = "commandant de flotte";
      imgName = "touringFleetChief";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le commandant d'une flotte touristique a à sa charge la gestion complète des navires de luxe qui la compose. Il doit savoir ou sont les vaisseaux en temps et en heure et il doit également veiller au confort et à la sécurité de tous les clients de la flotte.`;

      category = "tourisme / gestionnaire";
      break;
    case "touring-captain":
      careerName = "commandant de bord";
      imgName = "touringCaptain";
      careerAdvancement = "commandant de flotte";
      careerDescription = `Le commandant de bord d'un vaisseau touristique à les mêmes missions que le commandant de flotte, mais au niveau de son vaisseau uniquement.`;

      category = "tourisme";
      break;
    case "touring-cook-chief":
      careerName = "chef de cuisine";
      imgName = "touringCookChief";
      careerAdvancement = "néant";
      careerDescription = `Les chefs de cuisine sont responsables de la cuisine et du restaurant à bord des vaisseaux de croisière et des établissement de restauration Primaris. ils gèrent le réapprovisionnement de la nourriture et des équipements du restaurant.`;

      category = "restauration";
      break;
    case "touring-cook":
      careerName = "cuisinier confirmé";
      imgName = "exploration";
      careerAdvancement = "explorateur";
      careerDescription = `Le cuisinier est un membre de la cuisine d'un restaurant Primaris. Il est directement sous les ordres de son chef cuisinier.`;

      category = "restauration";
      break;
    case "touring-cook-apprentice":
      careerName = "apprentit cuisinier";
      imgName = "exploration";
      careerAdvancement = "cuisinier confirmé";
      careerDescription = `L'apprentit cuisinier est un jeune cuisinier tout juste affecté sur un vaisseau de croisière à la sortie de l'académie.`;

      category = "restauration";
      break;
    case "touring-waiter-chief":
      careerName = "chef de salle";
      imgName = "exploration";
      careerAdvancement = "explorateur";
      careerDescription = `Les serveurs sont responsables des salles dans les restaurants Primaris. Le chef cuisinier est leur responsable.`;

      category = "restauration";
      break;
    case "touring-waiter":
      careerName = "serveur";
      imgName = "exploration";
      careerAdvancement = "explorateur";
      careerDescription = `Les serveurs sont responsables des salles dans les restaurants Primaris. Le chef cuisinier est leur responsable.`;

      category = "restauration";
      break;
    case "touring-waiter-apprentice":
      careerName = "apprentit serveur";
      imgName = "exploration";
      careerAdvancement = "explorateur";
      careerDescription = `Les apprentits serveurs sont de jeune recrues affectées à un restaurant à la sortie de l'académie Primaris.`;

      category = "restauration";
      break;
    case "touring-bartender":
      careerName = "barman";
      imgName = "exploration";
      careerAdvancement = "explorateur";
      careerDescription = `Les barmans gèrent un bar soit à bord des vaisseaux de croisière soit dans des établissements particuliers. Lorsqu'ils servent dans un établissement qui comprends un chef cuisinier, ils demeurent sous sa responsabilité.`;

      category = "restauration";
      break;
    case "touring-bartender-apprentice":
      careerName = "apprentit barman";
      imgName = "exploration";
      careerAdvancement = "explorateur";
      careerDescription = `L'apprentit barman est une jeune recrue tout juste sortie de l'académie Primaris et qui a été affecté dans un établissement comme barman.`;

      category = "restauration";
      break;
    //-----------------------------

    // Department of trading and transport
    case "trading-director":
      careerName = "directeur";
      imgName = "tradingDirector";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur du Département du Commerce et du Transport est seul à occuper ce poste. Il supervise toutes les activités commerciales du département. Il informe l'Exécuteur Civil des résultats, des opportunités ainsi que des avancées en matière économique du département.`;

      category = "responsable";
      break;
    case "trading-sector-chief":
      careerName = "chef de secteur commercial";
      imgName = "tradingSectorChief";
      careerAdvancement = "directeur";
      careerDescription = `Les chefs de secteurs sont sous placés sous la responsabilité du directeur de département. Chacun d'entres-eux se voient affecter un secteur commercial géographique (En règle général, il s'agira d'un système solaire) dont ils sont les superviseurs. En fonction de l'importance de l'activité commerciale Primaris, ils peuvent être spécialisés à une ou plusieurs catégories commerciales. Charge à eux de récupérer les informations transmises par les commerçants Primaris afin que tout soit centralisé et exploitable par les membres de la faction.`;

      category = "responsable";
      break;
    case "fleet-travelling-merchant-chief":
      careerName = "commandant de flotte marchande";
      imgName = "tradingFleetTravelingMerchantChief";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le commandant d'une flotte marchande dirige une flotte complète de vaisseaux dédiés au commerce. Les batiments qui la composent peuvent être de différentes tailles. il gère également les escortes qui lui sont confiées. Connaissant l'emplacement des ressources sensibles, il sera le plus à même de définir quels vaisseaux devront être protégés en priorité.`;

      category = "commerce itinérant / gestion";
      break;
    case "capital-travelling-merchant":
      careerName = "marchand en vaisseau capital";
      imgName = "tradingCapitalTravellingMerchant";
      careerAdvancement = "commandant de flotte marchande";
      careerDescription = `Le marchand en vaisseau capital est le commandant de bord d'un vaisseau marchand de la classe capital ship tel que le Drake Kraken ou le Misc Hull E. Il est à la fois responsable de l'équipage, des escorteurs et des marchandises que le batiment transportera.`;

      category = "commerce itinérant / gestion";
      break;
    case "large-travelling-merchant":
      careerName = "marchand en transporteur lourd";
      imgName = "tradingLargeTravellingMerchant";
      careerAdvancement = "marchand vaisseau capital";
      careerDescription = `Le marchand en vaisseau lourd est le commandant de bord d'un vaisseau marchand de la classe large ship tel que le Misc Hull D. Il est à la fois responsable de l'équipage, des escorteurs et des marchandises que le batiment transportera.`;

      category = "commerce itinérant";
      break;
    case "medium-travelling-merchant":
      careerName = "marchand en transporteur moyen";
      imgName = "tradingMediumTravellingMerchant";
      careerAdvancement = "marchand en vaisseau lourd";
      careerDescription = `Le marchand en vaisseau moyen est le commandant de bord d'un vaisseau marchand de la classe medium ship tel que le Misc Hull C ou le Crusader M2. Il est à la fois responsable de l'équipage, des escorteurs et des marchandises que le batiment transportera.`;

      category = "commerce itinérant";
      break;
    case "light-travelling-merchant":
      careerName = "marchand en transporteur léger";
      imgName = "tradingLightTravellingMerchant";
      careerAdvancement = "marchand en transporteur moyen";
      careerDescription = `Le marchand en vaisseau léger est le commandant de bord d'un vaisseau marchand de la classe small ship tel que les Misc Hull A et B, les freelancer, etc. Il est à la fois responsable de l'équipage, des escorteurs et des marchandises que le batiment transportera.`;

      category = "commerce itinérant";
      break;
    case "merchant-multiple-shops":
      careerName = "responsable de plusieurs boutiques";
      imgName = "primarque";
      careerAdvancement = "responsable de secteur";
      careerDescription = `Le responsable de plusieurs établissements commerciaux gère l'ensemble du patrimoine qui lui est alloué. il entretient des liens étroits avec les chefs de secteurs.`;

      category = "commerce sédentaire / gestion";
      break;
    case "merchant-chief":
      careerName = "responsable de boutique";
      imgName = "primarque";
      careerAdvancement = "responsable de plusieurs boutiques";
      careerDescription = `Les marchands Primaris contrairement aux marchands itinérants aspirent à une certaine stabilité. Ils tiennent et gèrent leurs fonds de commerce, que ce soit à bord d'une station, d'un Banu Merchantman ou dans une ville. Ils n'ont pas dans l'idée d'abandonner les murs pour partir à l'aventure. C'est un avantage non négligeable qui permettra à chaque Primaris de trouver des boutiques à emplacement fixe tenus par d'autres Primaris dans la galaxie.`;

      category = "commerce sédentaire";
      break;
    case "seller":
      careerName = "vendeur";
      imgName = "primarque";
      careerAdvancement = "responsable de boutique";
      careerDescription = `Les vendeurs Primaris contrairement aux marchands itinérants aspirent à une certaine stabilité. La pluparts du temps, vous les retrouverez à l'intérieur des magasins tenus par d'autres Primaris.`;

      category = "commerce sédentaire";
      break;
    case "seller-apprentice":
      careerName = "apprentit vender";
      imgName = "primarque";
      careerAdvancement = "apprentit vendeur";
      careerDescription = `Les apprentis vendeurs viennent tout droit de l'académie Primaris. Ils sont affecté à un magasin de leur choix pour y effectuer des transactions commerciales.`;

      category = "commerce sédentaire";
      break;
    case "trader-chief":
      careerName = "chef d'équipe de trading";
      imgName = "trading";
      careerAdvancement = "chef de secteur";
      careerDescription = `Les chefs d'équipe de trading gèrent une équipe de plusieurs traders.`;

      category = "trader";
      break;
    case "trader":
      careerName = "trader confirmé";
      imgName = "trading";
      careerAdvancement = "chef d'équipe de trading";
      careerDescription = `Les traders Primaris sont les maîtres des méandres de l'économie et des marchés financiers. Ils étudient, élaborent des stratégies et domptent les cours des produits achetés et vendus dans a galaxie entière. `;

      category = "trader";
      break;
    case "trader-apprentice":
      careerName = "apprentit trader";
      imgName = "trading";
      careerAdvancement = "trader confirmé";
      careerDescription = `Les traders Primaris sont les maîtres des méandres de l'économie et des marchés financiers. ils étudient, élaborent des stratégies et domptent les cours des produits achetés et vendus dans a galaxie entière. `;

      category = "trader";
      break;
    case "delivery-man-chief":
      careerName = "chef equipe de coursiers";
      imgName = "tradingDeliveryManChief";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le chef d'équipe gère tous les coursiers qui lui sont alloués ainsi que leurs missions.`;

      category = "transporteur de biens";
      break;
    case "delivery-man":
      careerName = "coursier";
      imgName = "tradingDeliveryMan";
      careerAdvancement = "chef d'équipe de coursiers";
      careerDescription = `Les coursiers Primaris sont les experts du transport et des livraisons. Chaque Primaris peut faire appel à un livreur afin que ce dernier effectue une mission pour lui. Transport de biens particuliers, ou de marchandises, c'est dans leurs cordes. Ils se feront un plaisir d'accéder à vos requêtes même si celà les force à traverser la galaxie entière... moyennant une bonne compensation financière bien  entendu.`;

      category = "transporteur de biens";
      break;
    case "delivery-man-apprentice":
      careerName = "apprentit coursier";
      imgName = "tradingDeliveryManApprentice";
      careerAdvancement = "coursier confirmé";
      careerDescription = `Les apprentits coursiers sortent de l'Académie Primaris. Ils sont affectés dans une équipe de livreurs confirmés pour apprendre les difficultés du métier.`;

      category = "transporteur de biens";
      break;
    case "taxi-team-chief":
      careerName = "chef d'équipe de taxis";
      imgName = "tradingTaxiTeamChief";
      careerAdvancement = "chef de secteur";
      careerDescription = `Les chefs d'équipe de taxis sont responsables de plusieurs conducteurs. Ils centralisent le résultat et les chiffres liés à toutes les courses effectuées par leur équipe.`;

      category = "transporteur de personnes";
      break;
    case "taxi":
      careerName = "taxi";
      imgName = "tradingTaxi";
      careerAdvancement = "chef d'équipe de taxis";
      careerDescription = `Les taxis sont des chauffeurs qui effectuent des courses rémunérées afin de transporter des personnes. Ces courses peuvent les amener à voyager dans toutes la galaxie. Ils sont indépendants dans leur façon de travailler et peuvent choisir leurs clients.`;

      category = "transporteur de personnes";
      break;
    case "driver":
      careerName = "chauffeur privé";
      imgName = "tradingPrivateDriver";
      careerAdvancement = "neant";
      careerDescription = `Les chauffeurs privés sont affectés au transport d'une personne en particulier. La plupart du temps, les chauffeurs conduisent les autorités Primaris d'un point A à un point B. Certains d'entre eux peuvent également entrer au service d'un Primaris un peu plus aisé que les autres. Cette profession nécessite un certain degré de disponibilité et une grande discrétion. Les chauffeurs sont directement rattachés à leur VIP.`;

      category = "transporteur de personnes";
      break;
    case "spaceline-fleet-commander":
      careerName = "commandant de flotte de vaisseau ligne";
      imgName = "primarque";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le commandant d'une flotte de vaisseau de ligne supervise sa flotte sur tous ses aspects. il doit rester informé de la position, et du contenu de chaque batiment qui compose sa flotte.`;

      category = "transporteur de personnes";
      break;
    case "spaceline-captain":
      careerName = "commandant de bord de vaisseau ligne";
      imgName = "primarque";
      careerAdvancement = "commandant de flotte de vaisseau ligne";
      careerDescription = `Le pilote de ligne comme son nom l'indique est chargé d'effectuer un transport de plusieurs dizaines de personnes via son vaisseau de ligne entre plusieurs planètes. A l'heure actuelle, le seul vaisseau qui y soit destiné est le Crusader Starliner.`;

      category = "transporteur de personnes";
      break;
    case "spaceline-stewart":
      careerName = "stewart / hotesse";
      imgName = "primarque";
      careerAdvancement = "commandant de flotte de vaisseau ligne";
      careerDescription = `Les stewarts / hotesses veillent au conford des passagers du vaisseau de ligne pendant toute la durée du voyage. Ils sont sous la responsabilité du commandant de bord.`;

      category = "transporteur de personnes";
      break;

    //-----------------------------

    // Department of industry
    case "industry-director":
      careerName = "directeur industrie";
      imgName = "industryDirector";
      careerAdvancement = "polémarque";
      careerDescription = `Le chef directeur du département de l'industrie est le responsable de toute l'activité industrielle de la faction Primaris. Il traite directement avec l'Executeur Civil.`;
      category = "responsable";
      break;
    case "industry-sector-chief":
      careerName = "chef de secteur";
      imgName = "industrySectorChief";
      careerAdvancement = "directeur industrie";
      careerDescription = `Le chef de secteur est responsable d'un secteur particulier géographique et/ou industriel. Il centralise les résultats de son secteur et il les transmet pour information et gestion au directeur du département.`;

      category = "responsable";
      break;
    case "fleet-minor-chief":
      careerName = "commandant de flotte de minage";
      imgName = "industryFleetMinorChief";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le commandant d'une flotte de minage est responsable de sa flotte et des personnels qui la composent. Il traite directement avec le chef de secteur quant à ses résultats.`;

      category = "minage / gestion";
      break;
    case "minor-capital-ship-chief":
      careerName = "commandant de vaisseau capital mineur";
      imgName = "industryMinorCapitalShipChief";
      careerAdvancement = "commandant de flotte de minage";
      careerDescription = `Le commandant de vaisseau capital mineur est souvent placé à la tête d'un vaisseau de type RSI Orion. Il connait le minage sur le bout des doigts et il sait mener son équipage d'une main de maître.`;

      category = "minage";
      break;
    case "minor-chief":
      careerName = "chef mineur";
      imgName = "industryMinorChief";
      careerAdvancement = "commandant d'un vaisseau capital mineur";
      careerDescription = `Le chef mineur est responsable d'un vaisseau de minage multicrew tel que le Argo Mole. Avec l'aide de son équipage, il exécute les mêmes missions qu'un simple mineur en plus d'avoir son équipe à gérer.`;

      category = "minage";
      break;
    case "minor":
      careerName = "mineur confirmé";
      imgName = "primarque";
      careerAdvancement = "chef mineur";
      careerDescription = `En collaboration avec les explorateurs et les scientifiques, les mineurs fissurent les roches et les cristaux afin dans récupérer les minerais exploitables. ils savent placer au mieux les charges explosives, régler les amorces et détoner les explosifs pour augmenter leur rendement. Les mineurs doivent êtres minutieux, attentifs et rigoureux car cette profession est difficile, voire dangereuse. Chaque Primaris en est conscient.`;

      category = "minage";
      break;
    case "minor-apprentice":
      careerName = "apprentit mineur";
      imgName = "primarque";
      careerAdvancement = "mineur confirmé";
      careerDescription = `Les apprentits mineurs sortent tout juste de l'Académie Primaris. Néofytes en matière de minage, ils doivent continuer leur apprentissage auprès d'un mineur confirmé.`;

      category = "minage";
      break;
    case "refiner-chief":
      careerName = "chef equipe de raffineurs";
      careerAdvancement = "chef de secteur";
      imgName = "primarque";
      careerDescription = `Le chef d'équipe de raffineur gère une équipe composée de plusieurs raffineurs. `;

      category = "raffinage";
      break;
    case "refiner":
      careerName = "raffineur confirmé";
      imgName = "primarque";
      careerAdvancement = "chef d'équipe de raffineurs";
      careerDescription = `Le raffineur comme son titre l'indique raffine tous les matériaux que les mineurs vont lui apporter. Spécialiste de cette branche, il saura parfaitement extraire les minerais avec le minimum de perte.`;

      category = "raffinage";
      break;
    case "refiner-apprentice":
      careerName = "apprentit raffineur";
      imgName = "primarque";
      careerAdvancement = "raffineur confirmé";
      careerDescription = `L'apprentit raffineur sort juste de l'Académie Primaris. Il est affecté à bord d'un vaisseau ou d'une station de raffinage. Sous la tutelle d'un raffineur confirmé, il continue d'apprendre la rigueur et la précision du raffinage.`;

      category = "raffinage";
      break;
    case "fleet-recycler-chief":
      careerName = "commandant de flotte de recyclage";
      imgName = "primarque";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le commandant d'une flotte de recyclage gère tous les vaisseaux de recyclages qui sont présents dans sa flotte. Il traite directement avec le chef de son secteur.`;

      category = "recyclage";
      break;
    case "recycler-chief":
      careerName = "chef d'équipe de recycleurs";
      imgName = "primarque";
      careerAdvancement = "commandant de flotte de recyclage";
      careerDescription = `Le chef d'équipe de recycleurs gère quelques personnels pour les missions de recyclage. Ces derniers peuvent se trouver sans dans le même vaisseau que lui, soit dans d'autres vaisseaux.`;

      category = "recyclage";
      break;
    case "recycler":
      careerName = "recycleur confirmé";
      imgName = "primarque";
      careerAdvancement = "chef d'équipe de recycleurs";
      careerDescription = `Le recycleur est le maître dans l'art de chercher, de trouver et d'exploiter les épaes jusqu'à leur dernière pièce de métal. il savent tirer profit de la moindre parcelle d'un vaisseau abandonné.
      Ils peuvent s'appuyer sur les explorateurs pour leur fournir diverses coordonnées intéressantes.`;

      category = "recyclage";
      break;
    case "recycler-apprentice":
      careerName = "apprentit recycleur";
      imgName = "primarque";
      careerAdvancement = "recycleur confirmé";
      careerDescription = `L'apprentit recycleur sort juste de l'Academie Primaris. Il est affecté sous la responsabilité d'un recycleur confirmé.'`;

      category = "recyclage";
      break;
    case "industrial-engineer-chief":
      careerName = "chef ingénieur";
      imgName = "primarque";
      careerAdvancement = "chef de secteur";
      careerDescription = `Le chef ingénieur gère tous les ingénieurs industriels présents sur le vaisseau ou dans une flotte. Il traite directement avec le commandant du vaisseau ou le commandant de la flotte.`;

      category = "ingénierie industrielle";
      break;
    case "industrial-engineer":
      careerName = "ingénieur  confirmé";
      imgName = "primarque";
      careerAdvancement = "chef ingénieur";
      careerDescription = `L'ingénieur spécialisé dans les équipements industriels doit être capable de gérer, modifier, adapter et réparer tous les équipements présents dans les véhicules industriels de la faction. C'est un spécialiste et conseiller en matière de composents éléctroniques et mécaniques.`;

      category = "ingénierie industrielle";
      break;
    case "industrial-engineer-apprentice":
      careerName = "apprentit ingénieur";
      imgName = "primarque";
      careerAdvancement = "ingénieur confirmé";
      careerDescription = `L'apprentit ingénieur sort tout juste de l'Académie Primaris. Il est affecté dans un vaisseau industriel sous la tutelle d'un ingénieur confirmé. Grace à lui, il continue à découvrir le métier d'ingénieur et la difficulté que représente la maintenance des équipements.`;

      category = "ingénierie industrielle";
      break;

    //-----------------------------

    // Department of science
    case "sciences-director":
      careerName = "directeur scientifique";
      imgName = "sciences";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur du département scientifique gère tout le département. Il transmet les découvertes les plus importantes directement à l'Exécuteur Civil.`;

      category = "responsable";
      break;
    case "sciences-section-chief":
      careerName = "chef de section";
      imgName = "sciences";
      careerAdvancement = "directeur";
      careerDescription = `Le chef d'une section scientifique est responsable de toutes les recherches qui seront liées à cette section. `;

      category = "responsable";
      break;
    case "sciences-project-chief":
      careerName = "chef de projet";
      imgName = "sciences";
      careerAdvancement = "chef de section";
      careerDescription = `Les chefs de projet ont sous leur supervision la recherche complète sur un projet particulier. Ils sont responsables des recherches, de la sécurité des scientifiques et des résultats obtenus quant à ce projet.`;

      category = "sciences";
      break;
    case "archaeologist":
      careerName = "archeologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les archeologues Primaris sont envoyés dans les quatre coins de la galaxie afin d'effectuer des recherches sur le passé de l'Humanité. Savoir d'où l'on vient est essentiel.`;

      category = "histoire";
      break;
    case "astrochemist":
      careerName = "astrochimiste";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les astrochimistes Primaris sont chargés d'étudier les différents éléments chimiques détectés dans l'espace lointain, habituellement, dans les nuages de gaz moléculaire. Ils étudient aussi leur formation, leurs interactions et leur destruction. `;

      category = "chimie spatiale";
      break;
    case "astronomer":
      careerName = "astronome";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les astronomes sont chargés de l'observation des astres, cherchant à expliquer leur origine, leur évolution, ainsi que leurs propriétés physiques et chimiques`;

      category = "constellations";
      break;
    case "astrophysicist":
      careerName = "astrophysicien";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les astrophysiciens Primaris étudient des propriétés des objets de l'Univers, comme leur luminosité, leur densité, leur température et leur composition chimique.`;

      category = "constellations";
      break;
    case "biologist":
      careerName = "biologiste";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les biologistes Primaris sont chargés d'étudier toute les formes de vie dans leur ensemble.`;

      category = "vie";
      break;
    case "chemist":
      careerName = "chimiste";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les chimistes Primaris étudient la matière et ses transformations, et plus précisément : les éléments chimiques à l'état libre, atomes ou ions atomiques.`;

      category = "chimie";
      break;
    case "climatologist":
      careerName = "climatologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les climatologues Primaris étudient les climats et l'état moyen de l'atmosphère, c'est-à-dire la succession des conditions météorologiques sur de longues périodes dans le temps au sein des différentes planètes de la galaxie.`;

      category = "climat";
      break;
    case "echologist":
      careerName = "echologiste";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les échologistes Primaris étudient les interactions des êtres vivants entre eux et avec leur milieu. L'ensemble des êtres vivants, de leur milieu de vie et des relations qu'ils entretiennent forme un écosystème que ces derniers doivent établir et comprendre.`;

      category = "vie";
      break;
    case "geologist":
      careerName = "géologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les géologues Primaris étudient les différentes roches qui composent les planètes de la galaxie. Ils tentent par ces études de déterminer si certaines d'entres elles peuvent avoir une utilité pour l'Humanité.`;

      category = "roche";
      break;
    case "ichtyologist":
      careerName = "ichtyologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les ichtyologues Primaris étudient les poissons des points de vue phylogénétique, morphologique, anatomique, physiologique, écologique, éthologique et systématique. Les animaux étudiés par les ichtyologistes sont les poissons osseux, les poissons cartilagineux et les agnathes. Que ces derniers se trouvent en mer ou dans l'espace.`;

      category = "vie";
      break;
    case "medicine":
      careerName = "médecine";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les scientifiques dans le domaine de la médecine Primaris étudient l'organisation du corps, son fonctionnement normal, et cherchant à préserver la santé par la prévention et le traitement des maladies. La médecine humaine est complémentaire et en synergie avec la médecine vétérinaire. Ces études concernent toutes les espèces intelligentes et humanoïdes qui peuplent la galaxie.`;

      category = "vie";
      break;
    case "ornithologist":
      careerName = "ornithologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les ornithologues Primaris étudient les différentes espèces de créatures volantes présentes dans la galaxie.`;

      category = "vie";
      break;
    case "toxycologist":
      careerName = "toxycologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les toxycologues Primaris étudient les effets néfastes d'une source — molécule, radiation, nanomatériaux, etc. — sur des organismes ou des systèmes biologiques, que ces derniers soient humains ou non.`;

      category = "vie";
      break;
    case "zoologist":
      careerName = "zoologue";
      imgName = "sciences";
      careerAdvancement = "chef de projet";
      careerDescription = `Les zoologues Primaris étudient les différentes espèces animales présentes dans la galaxie (autres que les poissons ou les oiseaux).`;

      category = "vie";
      break;
    //-----------------------------

    // Department of medicine
    case "medicine-director":
      careerName = "directeur médecine";
      imgName = "medicine";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur du département de la médecine gère le département dans on ensemble. Il traite directement avec l'Executeur Civil. Conseiller et spécialiste, c'est lui qui propose de nouvelle mesures médicales à l'Executeur pour renforcer l'efficacité et l'accès aux soins pour les membres de la faction.`;

      category = "responsable";
      break;
    case "medicine-sector-chief":
      careerName = "chef de secteur";
      imgName = "medicine";
      careerAdvancement = "directeur";
      careerDescription = `Les chefs de secteurs sont responsables de tous les établissements médicaux et de tous les soins effectués dans un secteur géographique donné. ils traitent directement avec le directeur du département.`;

      category = "responsable";
      break;
    case "hospital-director":
      careerName = "directeur d'hôpital";
      imgName = "medicine";
      careerAdvancement = "chef de secteur";
      careerDescription = `Les directeurs d'hôpitaux ont la gestion complète d'un établissement hospitalier. Que celui-ci soit sédentaire ou dans un vaisseau, leur role reste le même. Veiller au bon fonctionnement de l'hôpital.`;

      category = "médecine / gestionnaire";
      break;
    case "medicine-section-chief":
      careerName = "chef section médicale";
      imgName = "medicine";
      careerAdvancement = "directeur d'hôpital";
      careerDescription = `Les chefs de sections médicales gèrent une section particulière et spécialisée dans un hôpital. Ils ont sous leur responsabilité le bon fonctionnement de cette section, mais aussi les personnels qui en font partie.`;

      category = "médecine / gestionnaire";
      break;
    case "emergency-doctor":
      careerName = "médecin urgentiste";
      imgName = "medicine";
      careerAdvancement = "chef de section";
      careerDescription = `Les médecins urgentistes sont les médecins qui receptionnent les cas graves au sein des différents hôpitaux. Ils peuvent être amenés à intervenir directement sur le terrain lorsque les conditions le nécessitent.`;

      category = "médecine / urgence";
      break;
    case "general-practicioner":
      careerName = "médecin généraliste";
      imgName = "medicine";
      careerAdvancement = "chef de secteur";
      careerDescription = `Les médecins généralistes sont les référents en matière de santé auprès des membres de la faction. ils sont la pour répondre aux questions générales sur les traitements médicaux et peuvent vous conseiller en cas de problème.`;

      category = "médecine / urgence";
      break;
    case "general-practicioner-apprentice":
      careerName = "apprentit médecin";
      imgName = "medicine";
      careerAdvancement = "médecin généraliste / médecin urgentiste";
      careerDescription = `Les apprentits médecins sont les dernières recrues sorties de l'Académie Primaris ou des chefs infirmiers ayant fait preuvent d'une grande compétence dans leur domaine et ayant été promus. Lors de leur affectation, ils doivent choisir dans quelle spécialité ils veulent s'orienter parmis toutes celles proposées par la faction.`;

      category = "médecine / urgence";
      break;
    case "nurse-chief":
      careerName = "chef infirmier";
      imgName = "medicine";
      careerAdvancement = "apprentit médecin";
      careerDescription = `Les chefs infirmiers sont responsables d'une équipe d'infirmiers. Ils ont un médecin pour gérer leurs missions et leur activités journalières.`;

      category = "médecine / urgence";
      break;
    case "nurse":
      careerName = "infirmier confirmé";
      imgName = "medicine";
      careerAdvancement = "chef infirmier";
      careerDescription = `Les infirmiers confirmés sont présents sur tous les secteurs médicaux. Ce sont les assistants de tous les médecins Primaris. Tout comme eux, ils sont amenés à agir soit dans un hôpital, soit en intervention directement à l'extérieur.`;

      category = "médecine / urgence";
      break;
    case "nurse-apprentice":
      careerName = "apprentit infirmier";
      imgName = "medicine";
      careerAdvancement = "infirmier confirmé";
      careerDescription = `Les apprentits infirmiers sont des personnels tout juste sorties de l'Académie Primaris.
      ils sont affecté dans un établissement de soin où ils devront continuer d'apprendre ce métier.`;

      category = "médecine / urgence";
      break;
    //-----------------------------

    // Department of culture
    case "culture-director":
      careerName = "directeur de la culture et des sports";
      imgName = "culture";
      careerAdvancement = "polémarque";
      careerDescription = `Le directeur du département de la culture & des sports gère l'intégralité des événements qui ont lieux dans la galaxie. Il traite directement avec l'Executeur Civil. `;

      category = "responsable";
      break;
    case "culture-section-chief":
      careerName = "chef de section culturelle ou sportive";
      imgName = "culture";
      careerAdvancement = "directeur";
      careerDescription = `Les chefs de sections culturelles ou sportives doivent gérer une section particulière d'un point de vue géographique. Cette dernière peut encadrer des événements journalistiques, rédactionnels ou encore d'autres domaines.`;

      category = "responsable";
      break;
    case "culture-editor":
      careerName = "éditeur";
      imgName = "culture";
      careerAdvancement = "chef de section culturelle ou sportive";
      careerDescription = `Les éditeurs Primaris se chargent de mettre en ligne toutes les publications Primaris sur les différentes plateformes de communication de la faction. Que ce soit sur le site web, sur les réseaux sociaux ou encore sur les forums, ils sont responsables de tout ce qui est publié et de la manière dont c'est fait.`;

      category = "faits divers";
      break;
    case "culture-journalist":
      careerName = "journaliste (streamer)";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `Les journalistes ont pour mission de rechercher et de retransmettre en direct tous les événements notables qui se produisent DANS de l'espace Primaris. Ils promeuvent notre culture ainsi que les événements organisés par les membres de la faction. Ceci sous la supervision de leur éditeur et en live.`;

      category = "faits divers";
      break;
    case "culture-reporter":
      careerName = "reporter (streamer)";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `les reporters ont pour mission de rechercher et de retransmettre en direct tous les événements notables qui se produisent en DEHORS de l'espace Primaris. Ils recherchent les faits divers intéressnts qui se produisent au sein de la galaxie et qui peuvent avoir un impact conséquent sur la faction. Ceci sous la supervision de leur éditeur et en live.`;

      category = "faits divers";
      break;
    case "culture-cameraman":
      careerName = "cameraman";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `Les caméramans sont chargés d'effectuer toutes les prises de vues dynamiques qui seront utiles pour la promulgation des futures vidéos de la faction. ils seront pour la plupart du temps accompagnés par d'autres personnels pour les mises en scènes.`;

      category = "édition";
      break;
    case "culture-photographer":
      careerName = "photographe";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `Les photographes ont à leur charge toutes les prises de photographies qui seront utiles pour la faction. Ces dernières serviront à la publication des divers articles, flyers et autres produits qui nécessiteront une image bien faite. `;

      category = "édition";
      break;
    case "culture-video-editor":
      careerName = "monteur video";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `Les monteurs vidéos se chargent de récupérer toutes les prises de vues et photos faites par les autres membres afin de créer de magnifiques vidéos. Ces montages serviront à la promotion de la faction Primaris ou à d'autres fins.`;

      category = "édition";
      break;
    case "culture-writer":
      careerName = "rédacteur";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `Les rédacteurs devront rédiger tous les contenus qui seront publiés d'une manière ou d'une autre. Le soin de l'écriture et la qualité rédactionnelle sont de rigueur pour accéder à ce poste.`;

      category = "édition";
      break;
    case "culture-graphist":
      careerName = "graphiste";
      careerAdvancement = "éditeur";
      imgName = "culture";
      careerDescription = `Les graphistes Primaris devront créer et formater toutes les documents Primaris qui nécessiteront leur intervention. Logos, flyers, mises en page des articles et autres accessoires seront mis en place par leurs soins. `;

      category = "édition";
      break;
    case "culture-sound-engineer":
      careerName = "ingénieur du son";
      imgName = "culture";
      careerAdvancement = "éditeur";
      careerDescription = `Les ingénieurs du son seront la pour assister les monteurs vidéos afin de coupler un son réfléchis et adapté au videos qui seront publiées dans le futur par nos éditeurs.`;
      category = "édition";
      break;
    case "culture-racing-team-leader":
      careerName = "chef d'écurie sportive";
      careerAdvancement = "chef de secteur";
      careerDescription = `Les chefs d'écurie sportive sont gèrent et resprésentent les différentes écuries de sport Primaris. Ils sont chargés de l'entrainement et de la réussite des sportifs Primaris.`;
      imgName = "culture";
      category = "sport";
      break;
    case "culture-jock":
      careerName = "sportif";
      imgName = "culture";
      careerAdvancement = "chef d'écurie sportive";
      careerDescription = `Les sportifs Primaris représenteront la faction Primaris dans divers sports physiques ou mécaniques à travers la galaxie.`;
      category = "sport";
      break;

    //-----------------------------

    // multi departments
    case "pilot":
      careerName = "pilote";
      imgName = "phoenix";
      careerAdvancement = "dépend du département et de la spécialité choisie";
      careerDescription = `Les pilotes Primaris devront choisir un département en cours de formation. Ce choix déterminera les manoeuvres qu'ils auront à apprendre pour être les plus efficaces une fois affectés. Ce métier est extrêment rigoureux car le pilote détient la vie de tout l'équipage entre ses joysticks.`;
      category = "multiple";

      break;
    case "gunner":
      careerName = "artilleur";
      imgName = "phoenix";
      careerAdvancement = "dépend du département et de la spécialité choisie";
      careerDescription = `Les artilleurs tout comme les pilotes devront choisir un département en cours de formation. Ce choix déterminera le type de vaisseau, et donc le type de tourelles à contrôler. Les artilleurs seront d'une importance capitale pour la défense des personnes et des propriétés Primaris.`;
      category = "multiple";
      break;
    case "crew-member":
      careerName = "membre d'équipage";
      imgName = "phoenix";
      careerAdvancement = "dépend du département et de la spécialité choisie";
      careerDescription = `Les membres d'équipages sont des personnels Primaris encore indécis sur la carrière qu'ils comptent adopter. Ils peuvent entrer au service des divers départements en tant que stagiaires afin de rechercher la meilleure orientation pour eux au sein de l'académie Primaris. Cette fonction ne peut pas être assumée plus de quelques mois.`;
      category = "aucune";

      break;
    case "independant-worker":
      careerName = "travailleur indépendant";
      careerDescription = `Les travailleurs indépendants de la faction ne sont rattachés à aucun département d'un point de vue statutaire. Ils travaillent et gèrent leurs bien indépendemment des départements. Cependant, une taxe sera toujours prélevée par le département qui gère les activités du dit travailleur. Ce statut offre plus d'indépendance mais ferme les portes aux avantages offerts par les divers départements. Il faut également savoir que les responsables indépendants ne pourront pas recruter de personnels appartenant à un département. Ils devront obligatoirement recruter d'autres travailleurs indépendants.`;
      imgName = "phoenix";
      careerAdvancement = "d'initiative";

      break;
    case "engineer":
      careerName = "ingénieur";
      careerDescription = `Les ingénieurs Primaris devront également choisir un département et une spécialisation en cours de formation à l'Académie Primaris. Leur savoir faire et leurs compétences techniques seront indispensables au bon maintien des équipements Primaris, et celà, peut importe le département concerné.`;
      imgName = "phoenix";
      careerAdvancement = "dépend du département et de la spécialité choisie";

      break;
    //-----------------------------

    default:
  }

  return (
    <div>
      <div
        style={{transition: "all .5s"}}
        className="job-logo-general-container"
      >
        <img
          style={{transition: "all .5s"}}
          id={career}
          className={
            job === career
              ? "job-logo-container deployed-civilian-" + department
              : "job-logo-container reduced"
          }
          src={"./assets/img/departments/jobs/" + imgName + ".webp"}
          alt=""
          onClick={() => setJob(career) & setActive(true)}
        />
      </div>
      <div
        style={{transition: "all .7s"}}
        className={
          active && job === career
            ? "slide-in job-detail-container"
            : "slide-out job-detail-container "
        }
      >
        <span
          className="come-back-btn-container"
          onClick={() => setJob("") & setActive(false)}
        >
          <i className="fa-sharp fa-solid fa-chevron-left"></i>
          <h4 className="come-back">retour arrière</h4>
        </span>

        <img
          className={"job-detail-background"}
          src={`./assets/img/departments/background-jobs/${career}.webp`}
          alt={"image du " + imgName}
        />
        <img
          style={{transition: "all .5s"}}
          id={career}
          className={"deployed-civilian-" + department}
          src={"./assets/img/departments/jobs/" + imgName + ".webp"}
          alt=""
        />
        <h3>{careerName}</h3>
        <h4 className="category">catégorie: {category} </h4>
        <p>{careerDescription}</p>
        <h4 className="promotion">promotion: {careerAdvancement}</h4>
      </div>
    </div>
  );
};

export default CivilianCareerCards;
