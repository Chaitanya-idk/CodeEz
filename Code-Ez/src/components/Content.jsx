
import './Content.css';
import { Footer } from './Footer';
import { Header } from './Header';
import {Link} from 'react-router';
export function Content() {
  return (
    <>
    <Header />
      <section className="about">
        <h1 style={{fontSize :"2.5rem"}}>Don't Fear STS anymore with CodeEz</h1>
        <p style={{marginTop :"2rem", marginBottom :"2rem"}}>
          Many Students face problems writing code directly during the exam days
          having no confidence. So we have developed this website to check and
          practice your STS questions along with Test Cases.
        </p>
      <div style={{display:"flex",gap:"20px"}}>
        <Link to="problems"><button >STS 3007</button></Link>
        <button>STS 4006</button>
        </div>
      </section>
      <Footer />
    </>
  );
}
