import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity , Dimensions } from "react-native";
import BottomNavBar from "../components/BottomNavBar"; // Adjust the path if necessary
import UpperNavBar from "../components/UpperNavBar";
import PourVous from "../BienComponent/PourVous";
import Articles from "../BienComponent/Article";
import Astuces from "../BienComponent/Astuces";
import Exercices from "../BienComponent/Exercices";


const data = [
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.sciforma.com/wp-content/uploads/2022/03/Screen-Shot-2022-06-01-at-4.28.51-PM-1024x578.png' },
    points: 50,
    category: 'Article',
    description: 'Dans un monde en constante évolution, choisir le bon métier pour son avenir peut être un défi de taille. De nombreux facteurs doivent être pris en compte, tels que les tendances du marché du travail, vos passions personnelles et vos compétences. Cet article vous guidera à travers les étapes essentielles pour prendre une décision éclairée, en vous aidant à évaluer vos intérêts, à explorer différentes options de carrière et à envisager l\'avenir avec confiance. Avec les bons outils et la bonne mentalité, vous pouvez faire un choix qui non seulement soutiendra votre bien-être financier mais aussi vous apportera satisfaction et épanouissement personnel.'
  },
  {
    title: 'Techniques pour réduire le stress quotidien',
    image: { uri: 'https://www.yarooms.com/hubfs/1-Sep-15-2023-02-45-09-1809-PM.png' },
    points: 50,
    category: 'Astuces',
    description: 'Le stress est une partie inévitable de la vie quotidienne, mais il existe des techniques efficaces pour le gérer et le réduire. Cet article explore diverses astuces pour diminuer le stress, telles que la méditation, la respiration profonde, l\'exercice physique régulier, et la gestion du temps. En intégrant ces pratiques dans votre routine, vous pouvez améliorer votre bien-être mental et physique, renforcer votre résilience face aux défis et vivre une vie plus équilibrée et sereine.'
  },
  {
    title: 'Exercices pour renforcer la collaboration en équipe',
    image: { uri: 'https://www.avocor.com/wp-content/uploads/2018/09/7-examples-of-teamwork-collaboration-in-the-workplace-featured-image.png' },
    points: 50,
    category: 'Exercices',
    description: 'Une collaboration efficace est essentielle pour le succès de toute équipe. Cet article propose une série d\'exercices conçus pour renforcer la collaboration et améliorer la communication au sein de votre équipe. Des activités de team-building aux jeux de rôle en passant par les ateliers de résolution de problèmes, ces exercices sont conçus pour développer la confiance, encourager la créativité et promouvoir une culture de collaboration positive. En mettant en pratique ces exercices, votre équipe peut devenir plus cohésive, innovante et performante.'
  },
  {
    title: 'L\'importance de la planification de carrière',
    image: { uri: 'https://www.sciforma.com/wp-content/uploads/2022/03/Screen-Shot-2022-06-01-at-4.28.51-PM-1024x578.png' },
    points: 50,
    category: 'Article',
    description: 'La planification de carrière est un processus stratégique qui vous permet de définir et d\'atteindre vos objectifs professionnels. Cet article explore l\'importance de la planification de carrière et fournit des conseils pratiques pour créer un plan de carrière efficace. En identifiant vos compétences, en établissant des objectifs clairs et en restant flexible face aux opportunités et aux défis, vous pouvez naviguer votre parcours professionnel avec plus de direction et de confiance. Un bon plan de carrière peut non seulement guider vos décisions mais aussi maximiser votre potentiel de croissance et de satisfaction.'
  },
  {
    title: 'Astuces pour améliorer votre productivité',
    image: { uri: 'https://www.yarooms.com/hubfs/1-Sep-15-2023-02-45-09-1809-PM.png' },
    points: 50,
    category: 'Astuces',
    description: 'Améliorer votre productivité peut avoir un impact significatif sur votre succès professionnel et personnel. Cet article partage des astuces pratiques pour optimiser votre temps et votre énergie, telles que la priorisation des tâches, la gestion des distractions, l\'utilisation d\'outils de productivité et l\'adoption de bonnes habitudes de travail. En appliquant ces astuces, vous pouvez accomplir plus en moins de temps, réduire le stress lié aux échéances et créer un équilibre travail-vie plus harmonieux. La clé de la productivité réside dans la combinaison de stratégies efficaces et de discipline personnelle.'
  },
  {
    title: 'Exercices pour améliorer votre bien-être physique',
    image: { uri: 'https://www.avocor.com/wp-content/uploads/2018/09/7-examples-of-teamwork-collaboration-in-the-workplace-featured-image.png' },
    points: 50,
    category: 'Exercices',
    description: 'Le bien-être physique est crucial pour une vie équilibrée et saine. Cet article propose une série d\'exercices adaptés à différents niveaux de forme physique pour améliorer votre bien-être général. Des étirements aux exercices de cardio en passant par la musculation, ces exercices sont conçus pour renforcer votre corps, augmenter votre énergie et améliorer votre santé globale. En intégrant ces exercices dans votre routine quotidienne, vous pouvez prévenir les maladies, améliorer votre humeur et vivre une vie plus active et épanouissante.'
  },
];

const HeartScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const email=route.params.email;

  const [activeComponent, setActiveComponent] = useState('Component1');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Component1':
        return <PourVous data={data} />;
      case 'Component2':
        return <Articles data={data.filter(item => item.category === 'Article')} />;
      case 'Component3':
        return <Astuces data={data.filter(item => item.category === 'Astuces')} />;
      case 'Component4':
        return <Exercices data={data.filter(item => item.category === 'Exercices')} />;
      default:
        return <PourVous data={data} />;
    }
  };

  return (
    <View style={styles.container}>
      <UpperNavBar navigation={navigation} currentScreen={currentScreen} email={email} />
      <View style={[styles.navigationButtons, { marginTop: 55 }]}>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component1' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component1')}
        >
        {  activeComponent === 'Component1'? <Text style={styles.navButtonTexte}>Pour Vous</Text>: <Text style={styles.navButtonText}>Pour Vous</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component2' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component2')}
        >
        {  activeComponent === 'Component2'? <Text style={styles.navButtonTexte}>Articles</Text>: <Text style={styles.navButtonText}>Articles</Text>}

      
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component3' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component3')}
        > 
        {  activeComponent === 'Component3'? <Text style={styles.navButtonTexte}>Astuces</Text>: <Text style={styles.navButtonText}>Astuces</Text>}

          
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component4' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component4')}
        >
        {  activeComponent === 'Component4'? <Text style={styles.navButtonTexte}>Exercices</Text>: <Text style={styles.navButtonText}>Exercices</Text>}

          
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {renderActiveComponent()}
      </View>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} email={email} />
    </View>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    // backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  navButtonContainer: {

    // borderRadius: 20,
    // backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeButton: {
    color: '#20AD96',
    
  },
  navButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  navButtonTexte: {
    fontSize: 16,
    color: '#20AD96',
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});

export default HeartScreen;
