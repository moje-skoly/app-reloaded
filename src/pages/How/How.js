import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const How = () => {
  const styles = require('./How.less');
  return (
    <Grid>
      <Row>
        <Col md={8} mdOffset={2} xs={12}>
          <div className={styles.how}>
            <h1><strong>Manifest</strong></h1>
            <h3>Naše hodnoty</h3>
            <hr/>
            <ol>
              <li>Naším cílem je <strong>zvyšovat povědomí rodičů</strong> o kvalitní škole v jejich okolí.</li>
              <li>Věříme, že každé dítě <strong>má právo</strong> dostat <strong>kvalitní vzdělání</strong> ve své nejbližší škole.</li>
              <li>Každé dítě má ve škole <strong>zažívat radost</strong> a <strong>rozvíjet svůj potenciál</strong>.</li>
              <li>Hlásíme se k iniciativě <a href="http://uspechzaka.cz/" target="_blank">Úspěch pro každého žáka.</a></li>
              <li>Chceme, aby každá škola hledala cesty k tomu, jak děti naučit přemýšlet a učit se.</li>
              <li>Za standard považujeme pedagogiku, která vychází z toho, jak se lidský mozek učí a co je potřeba pro uplatnění v současném světě: <strong>spolupráce, komunikace, tvořivost, řešení problémů a občanská angažovanost.</strong></li>
              <li>Fandíme aktivnímu úsilí rodičů o zlepšování výuky a prostředí na své spádové škole prostřednictvím školských rad, jednání s učiteli, vedením školy, případně zástupci městské části, která školu zřizuje.</li>
              <li>Cílem našeho projektu není vytvářet žebříčky a hledat nejlepší a nejhorší školy. Doufáme, že naše iniciativa povede ke vzájemné inspiraci mezi školami a tedy k jejich zlepšování.</li>
              <li>Jsme si vědomi toho, že při porovnávání škol existuje nebezpečí koncentrace dětí ze vzdělanějších a lépe zabezpečených rodin ve vybraných školách. Děti, které se narodily v chudém prostředí, budou v těch zbývajících. Projektem rozhodně nechceme posilovat sociální nerovnosti ve školství a ve společnosti. Chceme posílit informovanost rodičů a zlepšovat kvalitu všech škol.</li>
              <li>Přestože má projekt ukázat rozdílnosti mezi školami, včetně jejich silných a slabých stránek, nechceme jen kritizovat a vytvářet negativní atmosféru v českém školství. Věříme v pozitivní přístup a možnost zlepšování našich škol skrze občanskou angažovanost a spolupráci škol, dětí a rodičů.</li>
            </ol>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default How;
