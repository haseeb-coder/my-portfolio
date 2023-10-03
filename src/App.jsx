import { Fade } from 'react-awesome-reveal';

import Header from './components/Banner/Header';
import { Banner, Container } from './components/Banner/Header/style';
import ProfileComponent from './components/Banner/Profile';
import Clients from './components/Clients';
import Footer from './components/Footer';
import Projects from './components/Projects';
import { LightColor } from './components/Projects/style';
import Services from './components/Service';

function App() {
  return (
    <Container>
      <Banner>
        <Fade>
          <Header />
          <ProfileComponent />
        </Fade>
      </Banner>
      <Services />
      <LightColor>
        <Projects />
      </LightColor>
      <Clients />
      <LightColor>
        <Footer />
      </LightColor>
    </Container>
  );
}

export default App;
