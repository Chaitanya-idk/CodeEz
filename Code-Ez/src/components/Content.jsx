
import './Content.css';
import { Footer } from './Footer';
import { Header } from './Header';
export function Content() {
  return (
    <>
    <Header />
      <section className="about">
        <h1 style={{fontSize :"2.5rem"}}>Don't Fear STS anymore with CodeEz</h1>
        <p style={{marginTop :"2rem", marginBottom :"2rem"}}>
          Many Students face problems writing code directly during the exam days
          having no confidence. So we have developed a website to check and
          practice your STS questions along with Test Cases.
        </p>

        <button>STS 3007</button>
      </section>
      <Footer />
    </>
  );
}
