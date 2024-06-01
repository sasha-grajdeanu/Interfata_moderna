export default function Home() {
  return (
    <div className="flex flex-col justify-center font-josefinSans md:mx-16 mx-6 mb-4 gap-4">
      <div
        id="header-intro"
        className="flex flex-col items-center justify-center my-8"
      >
        <div
          id="header-info-top"
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-6xl">Salut! Aici </p>
          <p className="text-[80px] md:text-[112px] md:pl-8">I.M. - 1</p>
        </div>
        <div id="header-info-bottom"></div>
        <div>
          <p className="text-center text-4xl md:text-5xl">
            Interfața modernă pentru aplicația eSims
          </p>
        </div>
      </div>
      <div className="bg-[var(--wenge)] flex flex-col justify-between items-center md:flex-row p-4 rounded-xl text-white">
        <div className="grid gap-auto grid-cols-3 items-center xl:gap-2">
          <h1 className="text-2xl col-span-full grid-flow-col xl:col-span-1 md:text-4xl">
            Cum utilizez aplicatia?
          </h1>
          <ul className="text-xl list-decimal text-justify list-inside col-span-full xl:col-span-2 md:text-2xl">
            <li className="my-2">
              Te rugăm să ai un cont valid de eSims. Dacă nu ai un cont de
              eSims, îl poți face&nbsp;
              <a
                href="https://simsweb.uaic.ro/eSIMS/Register.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                aici
              </a>
              .
            </li>
            <li className="my-2">
              Dacă ai un cont valid de eSims, dar ai uitat parola, nu este nicio
              problemă, îți poți afla parola&nbsp;
              <a
                href="https://simsweb.uaic.ro/eSIMS/RecoverPassword.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                aici
              </a>
              .
            </li>
            <li className="my-2">
              Dacă ai cont valid de eSims, te poți întoarce pe platforma noastră
              și să te conectezi pentru a-ți vedea situația școlară.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[var(--wenge)] flex flex-col rounded-xl text-white">
        <div className="border-b-4 p-4">
          <h2 className="text-3xl">Despre aceasta aplicatie</h2>
        </div>
        <div className="p-4">
          <h4 className="font-mono text-2xl my-2 text-justify">
            I.M. - 1 : acronim de la Interfata Moderna - 1
          </h4>
          <p className="text-xl text-justify">
            I.M. - 1 reprezinta un proiect prin care studentii isi pot vizualiza
            situatia scolara, dar si situatia privind taxele printr-o interfata
            moderna, dar si responsive pentru cei ce doresc sa si vizualizeze
            notele prin intermediul telefonului mobil. Acest proiect a aparut ca
            o reimprospatare a aplicatiei eSims, ce nu a mai evoluat din punct
            de vedere al interfetei, dar si a caracterului de responsive din
            anul 2005 (anul viitor se fac 20 de ani de functiune al eSims).
            Astfel, pentru realizarea acestui proiect, s-a construit un API ce
            se ocupa de conectarea la platforma eSims, dar si de colectarea
            datelor ce se afla pe eSims.
          </p>
        </div>
      </div>
    </div>
  );
}
