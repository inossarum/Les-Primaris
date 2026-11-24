import React from "react";
import NavBar from "../../Navbar/NavBar";
import EncyclopediaNavBar from "../EncyclopediaNavBar/EncyclopediaNavBar";
import EncylopediaHistoryFactContainer from "./EncylopediaHistoryFactContainer";

const EncyclopediaPrimarisLorePage = () => {
  return (
    <div className="encyclopedia-lore-body">
      <NavBar factionPart={"civilian"} pageActive={"starCitizenEncyclopedia"} />
      <div className="encyclopedia-lore-title-container">
        <h2 className="encyclopedia-lore-title">Le lore Primaris</h2>
      </div>
      <EncyclopediaNavBar />
      <div className="encyclopedia-lore-main-container">
        <div className="encyclopedia-lore-main-container-time-line">
          <EncylopediaHistoryFactContainer
            date={"1944"}
            title={"Le début de notre histoire"}
            description={`En 1944, la seconde guerre mondiale faisait rage en Europe. Les Etats-Unis débarquèrent sur les côtes françaises afin de repousser la menace Nazi du pays; mais aussi afin de rendre sa liberté au peuple de France. Parmi les résistants, un homme nommé Lucius Sarum luttait afin de libérer son pays de l’oppression.\n
            
            Dans le secret le plus total, il créa un groupe de combattants. Il leur donna le nom de Premiers Nés. Voici leur devise à cette époque: Ne ploie jamais le genou devant un tyran! Ne fléchis jamais sous le poids de ton camarade blessé, soutiens-le! Survis! Bats-toi et sois libre! \n
            
            Ces divers personnages aidèrent les alliés lors de la campagne de libération du pays. Ils participèrent à la libération de Paris et ils suivirent les alliés lorsque ces derniers pénétrèrent en Allemagne. Beaucoup d’entre-eux furent tués, tandis que les plus chanceux survécurent au conflit. Mais tous demeurèrent unis, et cela jusqu’à leur fin.`}
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/1944.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2000"}
            title={"Conflits Mondiaux"}
            description={
              "Dans les années 2000, d’autres conflits éclatèrent à divers endroits du globe. Ces guerres d’intérêts économiques, géographiques et/ou religieux firent des millions d’autres morts. Les premiers nés, malgré leur faible nombre tentèrent d’intervenir afin de faire cesser ces conflits; mais cela hélas sans succès. Les négociations de traités de paix échouèrent et les guerres éclatèrent malgré tout. L’une des plus connues fut la guerre au Moyen-Orient. Lucius Sarum commençait à devenir vieux, ne pouvant plus assumer ses fonctions, il légua cette responsabilité ainsi que sa fortune à son fils, Remus. Ce dernier continua tant bien que mal de porter le flambeau et le fardeau de son père pendant plus de 50 ans."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2000.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2075"}
            title={"Le premier générateur quantique"}
            description={
              "En 2075, lorsque le docteur Childress et son équipe conçurent le premier générateur quantique autonome. Remus y vit une occasion pour les Premiers Nés de s’échapper de l’emprise terrienne et de participer à la découverte du système solaire. Ils participèrent à l’exploration de Mars et des lunes de Saturnes."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2075.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2113"}
            title={"Le premier terraformeur"}
            description={
              "En 2113, Robert Space Industries mit au point la première machine à terraformer. Certains Premiers Nés firent partie du projet et aidèrent à sa création. Ces mêmes personnes furent envoyées sur Mars pour sa terraformation, mais en 2125, un incident terrible eut lieu et 4876 personnes périrent sur place avant la réussite de cette opération. Parmi elles se trouvaient certains des plus brillants des Premiers Nés. Ce n’est qu’en 2157, que Mars fut terraformée. Grâce une fois de plus à la participation de la faction."
            }
            img={
              "./assets/img/StarCitizenEncyclopedia/primarisLore/terraformeur.webp"
            }
          />
          <EncylopediaHistoryFactContainer
            date={"2232"}
            title={"Départ de la Terre"}
            description={
              "En 2232, suite à la création d’un nouveau générateur quantique, une partie des Premiers Nés quitta la Terre à bord de l’Artemis afin d’atteindre la planète la plus proche de notre système solaire, cela dans le but de la terraformer elle aussi. Cette terraformation se solda par un succès et une colonie s’établit sur la planète. Au cours du 23ème siècle, le premier point de saut fut découvert par Nick Croshaw. Son passage dans la porte de saut lui permit de découvrir un nouveau système stellaire. Cette occasion entraîna les Premiers Nés à se rendre également dans ce nouveau système. Son exploration poussée permit à l’espèce humaine de trouver des ressources exploitables."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2232.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2380"}
            title={"Création de l'UNE"}
            description={
              "En 2380, les nations de la Terre s’unirent et formèrent l’UNE (United Nation of Earth). Les Premiers Nés devinrent dans le même temps les Primals. Les guerres et les rancœurs furent mises de côté. Ainsi donc, les Primals eurent un nouvel objectif: celui d’aider l’humanité à rester dans cette direction et à évoluer dans ce sens. Plus qu’un simple groupe, ils devinrent une faction à part entière, avec en son sein, un grand nombre de principes et de lignes de conduites. Toute l’humanité avait désormais les yeux rivés vers les étoiles et son infinité de possibilités."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2380.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2438"}
            title={"Rencontre du 3ème type"}
            description={
              "En 2438, la première rencontre avec les Banus s’officialisa. Les Primals ne participèrent hélas pas à ce premier contact. Mais ils restèrent alertes quant à l’existence de cette espèce. Quelle serait son attitude vis-à-vis de l’espèce humaine ? Serait-elle une menace ou d’une aide précieuse ? Seul l’avenir pourrait le dire. Commerçant en tous genres, certains d’entre eux semblèrent respectables et des échanges eurent lieu. La faction tua les autres pour leurs agissements qui allèrent à l’encontre de ses principes. Les premières victimes de la faction furent les trafiquants d’esclaves humains. Ces derniers n’hésitaient pas à capturer des familles entières pour ensuite les éclater et vendre les membres aux quatre coins de la galaxie. Des enfants humains se retrouvèrent seuls, loin des leurs, asservis et privés de liberté. Les Primals se devaient d’agir pour les secourir."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2438.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2523"}
            title={"Création de l'UPE / déchéance d'Argus SARUM"}
            description={
              "En 2523, l’UNE devint l’United Planet of Earth (UPE). Chaque planète pouvait désormais être représentée au Sénat Galactique. De fait, un pouvoir exécutif fut partagé entre trois tribuns. A cette époque, Argus Sarum était le dirigeant officiel de la faction Primals, protecteur de l’espèce humaine. Ces méthodes étant jugées trop drastiques, il n’obtint jamais le poste de tribun. Certaines opérations clandestines menées par les Primals arrivèrent aux oreilles des Sénateurs de l’UPE. Parmis eux, une partie soutint Argus dans ses démarches, mais la majorité s’y opposa. Craignant un conflit avec les Banus, Argus Sarum fut démis de ses fonctions officielles au sein du gouvernement et les Primals furent mis à l’écart des activités diplomatiques avec les Banus."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2523.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2530"}
            title={"Découverte des Xi'ans"}
            description={
              "En 2530, les Xi’ans furent découverts lors d’une tentative de terraformation. Ils capturèrent 276 personnes lors de l’opération. Parmi elles figuraient une dizaine de Primals. Les Xi’an relâchèrent le contremaître Charles Baxter en guise de bonne foi, mais Argus Sarum ne put s’en contenter. Il entreprit de faire libérer les autres détenus. Grâce au centre des renseignements Primals, il parvint à entrer secrètement en contact avec les Xi’an. Les négociations durèrent plusieurs jours. Il réussit finalement par obtenir gain de cause. Cependant, redoutant des représailles de la part de l’UPE, les Xi’ans ne relachèrent que les Primals détenus et conservèrent les autres prisonniers comme assurance. La guerre froide débuta suite à ces événements. Argus tenta d’envoyer une flotte secourir les derniers prisonniers, mais la mission se solda par un echec."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2530.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2541"}
            title={"Découverte des Tévarins / Perte de l'EX1A Expansion"}
            description={
              "En 2541, les Tévarins furent rencontrés sur Elysium IV. La guerre qui opposa l’humanité aux Tevarins débuta l’année suivante et dura quatre ans. Le conflit fut destructeur pour les Primals qui perdirent une de leur principale flotte de combat: La EX1A Expansion et les 7893 hommes et femmes qui la composaient. Les Tévarins se révélèrent de bons combattants et de fins stratèges. Leur arracher des victoires fût difficile, mais pas impossible. Lors de l’Opération Nemesis, Argus Sarum combattit aux côtés d’Ivar Messer qui devint celèbre de par ses décisions prises lors de la bataille d’Idris IV. Lors de cette escarmouche, les Primals participèrent au combat qui se déroulait au sol et dans l’espace. Argus soutint les initiatives d’Ivar au chantier naval tandis que son frère Orlus commandait la flotte Primals en orbite. L’implication des Primals fut reconnue par Ivar Messer. Cette reconnaissance permit à Argus de réintégrer le gouvernement de l’UPE."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2541.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2546"}
            title={"Création de l'UEE / Nouvelle idéologie de la faction"}
            description={
              "En 2546, l’UPE devint l’United Empire of Earth (UEE). Ce fut le début de l’Ère Messer. Cette époque restera à jamais gravée dans l’histoire Primals. Ils devinrent par ailleurs Les Primaris que nous connaissons toujours aujourd’hui. L’ère Messer engendra une certaine discorde au sein de la faction. Certains membres désiraient que la faction suive la lignée d’Imperators en place, tandis que les autres voulaient les évincer. Non content de choisir l’une des deux options, Argus décréta que la faction suivrait les Messer tant qu’ils iraient dans le sens de la doctrine Primaris et qu’ils veilleraient à la survie de l’espèce humaine. Dans le cas contraire, les Primaris deviendraient une faction séparatiste. Argus quitta ses fonctions au gouvernement et la faction Primaris demeura neutre vis à vis des agissements de l’Empire. Tantôt elle apporta son soutien aux initiatives prises par l’UEE, tantôt elle s’y opposa de diverses manières, qu’elles fussent pacifiques ou armées."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2546.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2603"}
            title={"Guerre Tévarine / Indépendance de la faction"}
            description={
              "En 2603, la seconde guerre Tevarine débuta et dura jusqu’en 2610. Une fois encore les Primaris participèrent aux escarmouches avec vigueur et stratégie, décrochant de magnifiques victoires mais subissant également de graves défaites. Eolis Sarum réorienta l’idéologie de la faction afin de la réadapter au contexte imposé par le conflit. La protection de l’espèce humaine devint la principale priorité des Primaris, pouvant les emmener jusqu’à une abnégation totale et jusqu’au sacrifice ultime, cela en faisant fi des lois locales. Il créa une entité secrète et indépendante de la faction principale. Cela pour éviter que des civils ne puissent être pris pour cible par les autorités locales mais également pour éviter d’éventuelles représailles à leur encontre. Eolis, déclara la faction Primaris comme étant une nation indépendante. Il devint le 1er Primarque et deux exécuteurs furent mis en place pour le seconder dans la gestion du gourvernement. Différents départements virent le jour. A cette époque, les citoyens Primaris se comptaient par millions. Malgré cette population nombreuse, ils demeurèrent discrets et tentèrent de survivre dans des systèmes à l’écart de l’UEE en conservant des rapports diplomatiques et commerciaux avec l’Empire."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2603.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2681"}
            title={"Découverte des Vanduuls / Destruction d'Armitage"}
            description={
              "En 2681, les Vanduuls furent découverts. La colonie d’Armitage fut anéantie par ces derniers. Les Primaris envoyèrent une flotte de sauvetage afin de secourir les quelques survivants éventuels, mais aucun être encore vivant ne se trouva parmi les décombres. Ils rencontrèrent lors de cette mission un des clans Vanduul à l’origine de l’attaque. Une bataille inconnue de tous fit rage loin de la colonie, mais les sauveteurs n’étant pas suffisamment nombreux; elle se solda par une défaite et la mort de plusieurs milliers de Primaris."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2681.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2697"}
            title={"Négociation de la paix avec les Xi'ans"}
            description={
              "En 2697, l’Imperator Illyana Messer désigna Samuel Messer comme son successeur. La guerre contre les Xi’an empirait et les Primaris subirent de nouveaux de lourdes pertes. Eolis Sarum désormais éteint, Aelius Sarum dirigea les Primaris durant ce théâtre sanglant. Apprenant l’initiative secrète du Sénateur Akari, Aelius se joint à lui afin de négocier un traité avec les forces Xi’an. Cette opération décisive fut un grand succès. Les Xi’an démobilisèrent leurs troupes et bâtirent en retraite."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2697.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2780"}
            title={"Guerre contre les Vanduuls / Mort d'Aelius SARUM"}
            description={
              "En 2780, les Vanduuls et l’UEE se retrouvèrent au cœur d’un conflit meurtrier qui emporta avec lui des millions de vies humaines. Les Primaris tentèrent de combattre aux côtés des forces de l’UEE mais leurs colonies étant proches des frontières Vanduuls, ils se retrouvèrent quasiment éradiqués. Aelius Sarum trouva la mort sous les bombes antimatières du 6ième Groupe de bataille lors de l’attaque de l’UEE sur Tiber II. Son fils, Lonis Sarum lui succéda à la tête de la nation et devint Primarque. Désormais réduite à quelques centaines d’individus, la nation Primaris se retrouva faible et peu influente. Sa participation aux batailles suivantes ne fut pas décisive quant aux résultats obtenus."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2780.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2792"}
            title={"Terraformation de Garron II"}
            description={
              "En 2792, l’UEE teraforma la planète Garron II en détruisant par la même occasion toute vie sur place. Bien que soutenant le développement de l’espèce humaine en premier lieu, Lonis Sarum demeura contre cette terraformation qui continue aujourd’hui de représenter la plus grande catastrophe écologique connue."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2792.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2800"}
            title={"Construction de l'Arche"}
            description={
              "En 2800, l’UEE construisit l’Arche et les Primaris se regroupèrent. Son but était de devenir le dépositaire de la connaissance universelle, et de servir de terrain neutre pour les discussions diplomatiques inter-espèces. La faction Primaris participa évidemment à sa création en dépêchant quelques scientifiques lors de son élaboration et de sa construction."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2800.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2945"}
            title={"Nomination d'Inos SARUM à la tête de la faction"}
            description={
              "En 2945, la guerre Vanduul fut officialisée. Inos Sarum devint le Primarque de la nation Primaris à la mort de Lonis. Tandis que l’UEE mobilisait les forces civiles pour participer au conflit, les Primaris tentaient de se faire connaître de nouveau afin de regagner leur force d’antan. Aujourd’hui, leur motivation n’est en rien atténuée. Malgré leur faible nombre, ils demeurent bien présents."
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2945.webp"}
          />
          <EncylopediaHistoryFactContainer
            date={"2953"}
            title={"Retour dans la lice"}
            description={
              "Divisée en trois entités bien distinctes, la nation Primaris représente tous les métiers et toutes les activités réalisables qui se trouvent dans la galaxie. Leur objectif est simple, devenir une des nations les plus puissantes de l’univers et défendre l’humanité avec ferveur, comme elle l’a toujours fait, et comme elle le fera toujours! Longue vie à l’humanité, longue vie aux Primaris!"
            }
            img={"./assets/img/StarCitizenEncyclopedia/primarisLore/2953.webp"}
          />
        </div>
      </div>
    </div>
  );
};

export default EncyclopediaPrimarisLorePage;
