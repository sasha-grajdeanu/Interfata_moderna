export default function Home() {
  return (
    <div className="flex flex-col justify-center font-urbanist md:px-16 px-6 bg-gradient-to-b from-Retrosphere-400 to-Retrosphere-200 dark:from-Space-400 dark:to-Space-200">
      <div
        id="header-intro"
        className="flex flex-col justify-center my-8 py-8 bg-Retrosphere-500 dark:bg-Space-500 rounded-xl min-h-96"
      >
        <div
          id="header-info-top"
          className="flex flex-col md:flex-row items-center justify-center"
        >
          <p className="text-6xl">Salut! Aici </p>
          <p className="text-[80px] md:text-[112px] md:pl-8 bg-clip-text font-semibold text-transparent bg-gradient-to-br from-Retrosphere-100 to-Retrosphere-200 dark:from-Space-100 dark:to-Space-200">I.M. - 1</p>
        </div>
        <div id="header-info-bottom">
        <p className="text-center text-4xl md:text-5xl">
            Interfața modernă pentru aplicația eSims
          </p>
        </div>
      </div>
      <div className="bg-Retrosphere-500 dark:bg-Space-500  flex flex-col justify-between items-center md:flex-row p-4 rounded-xl text-black mb-8">
        <div className="grid gap-auto grid-cols-3 items-center xl:gap-2">
          <h1 className="text-2xl col-span-full grid-flow-col xl:col-span-1 md:text-4xl">
            Cum utilizez aplicația?
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

      <div className="bg-Retrosphere-500 dark:bg-Space-500  flex flex-col rounded-xl text-black mb-8">
        <div className="border-b-4 p-4 border-Retrosphere-100 dark:border-Space-100">
          <h2 className="text-3xl">Despre această aplicație</h2>
        </div>
        <div className="p-4">
          <h4 className="font-mono text-2xl my-2 text-justify">
            I.M. - 1 : acronim de la Interfață Modernă - 1
          </h4>
          <p className="text-xl text-justify">
            I.M. - 1 reprezintă un proiect prin care studenții își pot vizualiza
            situația școlară, dar și situația privind taxele printr-o interfață
            modernă, dar și responsive pentru cei ce doresc să-și vizualizeze
            notele prin intermediul telefonului mobil. Acest proiect a apărut ca
            o reîmprospătare a aplicației eSims, ce nu a mai evoluat din punct
            de vedere al interfeței, dar și a caracterului de responsive din
            anul 2005 (anul viitor se fac 20 de ani de funcțiune al platformei eSims).
            Astfel, pentru realizarea acestui proiect, s-a construit un API ce
            se ocupă de conectarea la platforma eSims, dar și de colectarea
            datelor utilizatorului expuse de către eSims.
          </p>
        </div>
      </div>
    </div>
  );
}
