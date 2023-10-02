import Header from "./components/Banner/Header";
import { Banner, Container } from "./components/Banner/Header/style";
import ProfileComponent from "./components/Banner/Profile";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import { Project } from "./components/Projects/style";
import Services from "./components/Service";

function App() {
  return (
    <Container>
      <Banner>
        <Header />
        <ProfileComponent />
      </Banner>
      <Services />
      <Project>
        <Projects />
      </Project>
      <Clients/>

    </Container>
  );
}

export default App;
